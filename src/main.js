import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import api from '@/api';
import config from '@/config';
import router from '@/router';

Vue.prototype.$api = api;
Vue.prototype.$config = config;
Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
