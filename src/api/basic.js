import config from '@/config';
import utils from '@/utils';

export default Object.freeze({
  ENTITY: '',
  axios: config.urls.AXIOS_STORAGE,

  async get(filter) {
    return this.axios({
      method: 'get',
      url: utils.urls.createFilterURL(`${this.ENTITY}`, filter),
    })
    .then( (response) => Promise.resolve(response) )
    .catch( (error) => {
      return Promise.reject(error);
    });
  },

  async getById(id) {
    return this.axios({
      method: 'get',
      url: `${this.ENTITY}/${id}`,
    })
    .then( (response) => Promise.resolve(response) )
    .catch( (error) => {
      return Promise.reject(error);
    });
  },

  async post(data) {
    return this.axios({
      method: 'post',
      url: `${this.ENTITY}`,
      data
    })
    .then( (response) => {
      return Promise.resolve(response);
    })
    .catch( (error) => {
      return Promise.reject(error);
    });
  },

  async replace(id, data) {
    return this.axios({
      method: 'put',
      url: `${this.ENTITY}/${id}`,
      data
    })
    .then( (response) => {
      return Promise.resolve(response);
    })
    .catch( (error) => {
      return Promise.reject(error);
    });
  },

  async delete(id) {
    return this.axios({
      method: 'delete',
      url: `${this.ENTITY}/${id}`,
    })
    .then( (response) => {
      return Promise.resolve(response);
    })
    .catch( (error) => {
      return Promise.reject(error);
    });
  },
});
