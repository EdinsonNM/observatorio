import AuthUtils from '../libs/AuthUtils';

export default class User {
	constructor(userData){
		if(userData.uid)
			this._id = userData.uid;

    if(userData.id)
			this._id = userData.id;

		if(userData.email)
			this._email = userData.email;

    if(userData.password)
			this._password = userData.password;

		if(userData.nombres)
			this._nombres = userData.nombres;

		if(userData.apellidos)
			this._apellidos = userData.apellidos;

		if(userData.institucion)
			this._institucion = userData.institucion;

		if(userData.isAdmin){
			this._isAdmin = userData.isAdmin;
		}else{
      this._isAdmin = false;
    }


	}

  toJson(){
    return {
      nombres: this._nombres,
      apellidos: this._apellidos,
      email: this._email,
      isAdmin:this.isAdmin,
      id:this._id
    };
  }

  set id(value){
    this._id = value;
  }
	get id(){
		return this._id;
	}

	get nombres(){
		return this._nombres;
	}

	get apellidos(){
		return this._apellidos;
	}

	get email(){
		return this._email;
	}

	get institucion(){
		return this._institucion;
	}

	get isAdmin(){
		return this._isAdmin;
	}

  get password(){
    return this._password;
  }


	update( partialObj ){

		if(partialObj.nombres)
			this._nombres = partialObj.nombres;

		if(partialObj.apellidos)
			this._apellidos = partialObj.apellidos;


	}




}
