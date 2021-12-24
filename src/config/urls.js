import axios from 'axios';

const URL_API_STORAGE = process.env.VUE_APP_URL_API_STORAGE;
const URL_API_ACTIONS = process.env.VUE_APP_URL_API_ACTIONS;
const USE_PROXY = process.env.VUE_APP_USE_PROXY;

const AXIOS_STORAGE = axios.create({ baseURL: `${URL_API_STORAGE}/api` });
const AXIOS_ACTIONS = axios.create({ baseURL: `${URL_API_ACTIONS}/api` });

export default Object.freeze({
  URL_API_STORAGE,
  URL_API_ACTIONS,
  AXIOS_STORAGE,
  AXIOS_ACTIONS,
  USE_PROXY,
});
