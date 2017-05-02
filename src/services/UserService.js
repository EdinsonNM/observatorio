import User from '../models/User';
import Service from './Service';
let userInstance;
let selectedUser = null;
let route="usuarios";
let database = firebase.database();
let originApp ="";
export default class UserService extends Service{
  static get(uid,next){
      database.ref(`/${route}/${user.uid}`).once('value').then(function(snapshot) {
        var username = snapshot.val();
        username.uid=uid;
        return next(null,new User(username));
    });
  }

  static me(){
    return userInstance;
  }

  static setMe(user){
    userInstance = new User(user);
  }

  static origin(){
    return (userInstance)?userInstance.institucion:originApp;
  }
  static originParam(origin){
	originApp = origin;
  }



}
