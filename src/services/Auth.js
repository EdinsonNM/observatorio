/**
 * @name Auth
 * @author Edinson Nuñez More
 * @type {Class}
 * @description Class for authentication
 */

import AuthToken from '../libs/AuthToken.js';
import nativeToast from 'native-toast'
import Users from './UserService';
import Service from './Service';
const serviceName = 'login';
window.loadeduser=false;
import * as firebase from 'firebase';


//firebase.initializeApp(config);
//let database = firebase.database();
export default class Auth{
	static redirectAdmin(user,next){
		window.user = user;
		if(document.location.hash=='#/login'){
			document.location.hash = "#/dashboard/main";
		}
		AuthToken.setToken(user.uid);
		nativeToast({
			message: 'Bienvenido!',
			position: 'top',
			timeout: 5000
		});
		return next(null,user);
	}
	static redirectPostulante(user,next){
		window.user = user;
		if(document.location.hash=='#/login'){
			document.location.hash = "#/postulante/main";
		}
		AuthToken.setToken(user.refreshToken);
		nativeToast({
			message: 'Bienvenido!',
			position: 'top',
			timeout: 5000
		});
		return next(null,user);
	}
  // login[POST]
  static init(next){
    Service.firebase.auth().onAuthStateChanged(function(user) {
      window.loadeduser=true;
      console.log('loaded info user...');
      if (user) {
		  Auth.redirectAdmin(user,next);
      } else {
        console.log("no user... :(");
        return next("no user... :(");
      }
    });
  }
  static login( model, next ){
    AuthToken.setToken();
    firebase.auth().signInWithEmailAndPassword(model.email, model.password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(error);
      return next(error);
    });
  }

  static loginAnonymous(model, next){
	firebase.auth().signInAnonymously().catch(function(error) {
		var errorCode = error.code;
		var errorMessage = error.message;
		console.log(error);
		return next(error);
	});
  }


  // me[GET]
  static me(next){
    var user = Service.firebase.auth().currentUser;
    if (user) {
		if(!user.isAnonymous){
			return Users.get(user.uid,next);
		}else{
			return next(null,user);
		}
    } else {
      return next({message:"No user is signed in."});
    }

  }


  static loggedIn(){
    return !!AuthToken.getToken();

  }

  static logout( noRedirect ){
    AuthToken.setToken();
    firebase.auth().signOut().then(function() {
      document.location.hash="#/login";
    }, function(error) {
    // An error happened.
    });
  }

  static requestResetPasswordKey(model,next) {
    var service = api.all('password/requestResetPasswordKey');
    service.post(model).then(
    (result)=>{
      return next(null,result);
    },(error)=>{
      return next(error.response.data.data);
    })
    .catch((err) => {
      console.log('error',err);
      return next(err);
    });
  }

  static resetPassword(model,next) {
    var service = api.one('password/resetPassword', '');
    AuthToken.setToken('Bearer '+ model.token);
    service.put({password: model.password}).then(
    (result)=>{
      console.log('entro');
      AuthToken.setToken(null);
      return next(null,result);
    },(error)=>{
      console.log('error', result);
      return next(error.response.data.data);
    })
    .catch((err) => {
      console.log('error',err);
      return next(err);
    });
  }

}
