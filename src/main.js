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

[
  axios,
  config.urls.AXIOS_STORAGE,
  config.urls.AXIOS_ACTIONS
].forEach( ax => {
  utils.urls.configureAxiosErrors(ax, store)
});

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
