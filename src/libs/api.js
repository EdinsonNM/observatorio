import AuthToken from './AuthToken';
import 'whatwg-fetch';

import restful, { fetchBackend } from 'restful.js';
const api = restful('http://sinia.minam.gob.pe', fetchBackend(fetch));
api.identifier('_id');

export default api;
