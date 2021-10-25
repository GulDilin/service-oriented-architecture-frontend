import axios from 'axios';

const URL_API = process.env.VUE_APP_URL_API;
axios.defaults.baseURL = `${URL_API}/api/`;

export default Object.freeze({
  URL_API,
});
