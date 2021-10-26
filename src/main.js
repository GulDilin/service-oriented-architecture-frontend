import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import api from '@/api';
import config from '@/config';
import enums from '@/enums';
import utils from '@/utils';
import router from '@/router';
import store from '@/store';
import axios from 'axios';

axios.interceptors.response.use(
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
    }
    return Promise.reject(error);
  }
);


Vue.prototype.$api = api;
Vue.prototype.$enums = enums;
Vue.prototype.$config = config;
Vue.prototype.$utils = utils;
Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
