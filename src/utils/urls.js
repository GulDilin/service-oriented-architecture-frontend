import axios from 'axios';

export default Object.freeze({
  createFilterQuery(filter) {
    if (!filter) return undefined;
    return Object.entries(filter)
    .filter( ([k, v]) => k && v != undefined && v != null )
    .map( ([k, v]) => Array.isArray(v) ? v.map( item => `${k}=${item}`).join("&") : `${k}=${v}`)
    .join('&')
  },

  createFilterURL(baseUrl, filter) {
    if (!filter) return baseUrl;
    let filterUrl = this.createFilterQuery(filter);
    return filterUrl ? `${baseUrl}?${filterUrl}` : baseUrl;
  },

  configureAxiosErrors(instance, store) {
    instance.interceptors.response.use(
      response => response,
      error => {
        if (axios.isCancel(error)) return Promise.reject(error);
        let data = error?.response?.data ?? {};
        let { message } = data;
        if (typeof message === 'object') {
          Object.entries(message).forEach(
            ([ key, value ]) =>  store.dispatch('alerts/error', { title: data.error, text: `Error with field ${key}: ${value}` }));
        } else if (message) {
          store.dispatch('alerts/error', { title: data.error, text: message });
        } else {
          store.dispatch('alerts/error', { title: data.error });

        }
        return Promise.reject(error);
      }
    );
  }
})

