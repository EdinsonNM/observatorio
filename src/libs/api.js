import AuthToken from './AuthToken';
import 'whatwg-fetch';

import restful, { fetchBackend } from 'restful.js';
const api = restful('http://localhost:3000', fetchBackend(fetch));
api.identifier('_id');

api.addRequestInterceptor((config) => {
    const token = AuthToken.getToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers.Accept="application/json";
      config.headers.Authorization = token;
    }
    return config;
});

api.addResponseInterceptor((response, config) => {
    const { data, headers, statusCode } = response;
    if(headers.authorization){
      AuthToken.setToken(headers.authorization);
    }
    return config;
});

api.on('request:interceptor:pre', (config, interceptorName) => {
    $("#loading-bar").show();
});

api.on('response:interceptor:post', (response, config, interceptorName) => {
    $("#loading-bar").hide();
});

api.on('error', (error, config) => {
    $("#loading-bar").hide();
});

export default api;