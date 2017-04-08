const key = 'auth-token';
const store = localStorage;
export default class AuthToken{
  static getToken(){
    return store.getItem(key)||null;
  }
  static setToken(token){
    if (token) {
      store.setItem(key, token);
    } else {
      store.removeItem(key);
    }
  }
}