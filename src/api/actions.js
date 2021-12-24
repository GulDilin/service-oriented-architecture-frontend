import config from '@/config';
const axios = config.urls.AXIOS_ACTIONS;

export default Object.freeze({
  axios,

  getDistanceBetweenCitites(id1, id2) {
    return this.axios({
      method: 'get',
      url: `/calculate/length/${id1}/${id2}`,
    });
  },

  getDistanceToMaxPopulated() {
    return this.axios({
      method: 'get',
      url: `/calculate/to-max-populated`,
    });
  },
});
