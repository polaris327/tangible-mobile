import {API_URL} from './main';
import axios from 'axios';
import cookie from 'react-cookie';

export default {
  get: function(url, query, token) {
    return axios.get(API_URL + url, {params: query, headers: {
      Authorization: (token ? 'JWT ' + token : null) || cookie.load('token')
    }});
  },

  post: function(url, query, token) {
    return axios.post(API_URL + url, query, {headers: {
      Authorization: (token ? 'JWT ' + token : null) || cookie.load('token')
    }});
  },

  put: function(url, query, token) {
    return axios.put(API_URL + url, query, {headers: {
      Authorization: (token ? 'JWT ' + token : null) || cookie.load('token')
    }});
  },

  remove: function(url, query, token) {
    return axios.delete(API_URL + url, {params: query, headers: {
      Authorization: (token ? 'JWT ' + token : null) || cookie.load('token')
    }});
  }
}
