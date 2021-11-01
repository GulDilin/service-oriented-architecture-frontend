import axios from 'axios';
import utils from '@/utils';

export default Object.freeze({
  ENTITY: '',

  async get(filter) {
    return axios({
      method: 'get',
      url: utils.urls.createFilterURL(`${this.ENTITY}`, filter),
    })
    .then( (response) => Promise.resolve(response) )
    .catch( (error) => {
      return Promise.reject(error);
    });
  },

  async getById(id) {
    return axios({
      method: 'get',
      url: `${this.ENTITY}/${id}`,
    })
    .then( (response) => Promise.resolve(response) )
    .catch( (error) => {
      return Promise.reject(error);
    });
  },

  async post(data) {
    return axios({
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
    return axios({
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
    return axios({
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
