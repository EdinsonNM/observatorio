import User from '../models/User';
import Service from './Service';
import * as firebase from 'firebase';
let userInstance;
let selectedUser = null;
let route="usuarios";
let originApp ="";

var config = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId
};
var fbAdmin = firebase.initializeApp(config, "Secondary");

export default class UserService extends Service{
  constructor(){
    super(route);
  }

  post(model,next){
    fbAdmin.auth().createUserWithEmailAndPassword(model.email,model.password)
    .then((user)=>{
      console.log(user);
      model.id = user.uid;
      fbAdmin.auth().signOut();
      super.post(model.toJson(),next,'',true);
    })
    .catch((error,data)=>{
      console.log(error,data)
    });
  }

  resetPassword(email,next){
    firebase.auth().sendPasswordResetEmail(email).then(function() {
      // Email sent.
      return next(null,'ok');
    }, function(error) {
      // An error happened.
    });
  }

  static get(uid,next){
      Service.database.ref(`/${route}/${user.uid}`).once('value').then(function(snapshot) {
        var username = snapshot.val();
        username.uid=uid;
        username.id = uid;
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
