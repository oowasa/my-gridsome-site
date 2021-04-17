import axios from 'axios';
import Vue from 'vue';

const service = axios.create({
  baseURL: 'https://api.github.com',
  timeout: 15000
});

service.interceptors.request.use(config => {
  let token = '';
  if (token) {
    let sp = '?';
    if (config.url.indexOf('?') >= 0) {
      sp = '&';
    }
    config.url = config.url + sp + 'access_token=' + token
  }
  return config;
}, error => {});

service.interceptors.response.use(response => {
  let responseJson = response.data;
  return response;
}, error => {
  let messge;
  switch (error.response.status) {
    case 401:
      message = 'Token错误';
      break;
    // default:
    //   console.log(error, 'error');
    //   message = error.response.message;
    //   break;
  };
  return Promise.reject('error');
});

export default service;