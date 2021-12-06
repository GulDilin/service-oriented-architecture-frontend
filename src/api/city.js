import basic from './basic';
import config from '@/config';
const axios = config.urls.AXIOS_STORAGE;

export default Object.freeze({
  ...basic,

  axios,
  ENTITY: 'city',
});
