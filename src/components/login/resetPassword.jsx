import React from 'react';
import ReactDOM from 'react-dom';
import TextField from 'material-ui/TextField';
import Auth from '../../services/Auth';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import nativeToast from 'native-toast';
import UserService from '../../services/UserService';
const styles = {
  floatingLabelStyle: {
    color: "white",
  }

};

export default class ResetPasword extends React.Component{
	constructor () {
		super();
		this.state = {
			email:'',
			password:'',
			loading:false,
            sent:false,
			message:{
				open:false,
				message:''
			}
		};
	}

	cleanUsername(username){
		if(username){
			return username.toLowerCase().trim();
		}
		return null;
	}

	handleLogin( e ){
		this.setState({loading:true});
		e.preventDefault();
		let _self = this;
		const reqBody = {
			"email": this.cleanUsername(this.state.email),
			"password": this.state.password
		};
		Auth.login( reqBody, ( error, data )=>{
			_self.setState({ loading:false } );
			if(error){
				nativeToast({
					message: error.message,
					position: 'top',
					timeout: 5000,
					type: 'warning'
				});
			}

		});
	}


	resetMyPassword(){
        let service = new UserService();
        service.resetPassword(this.state.email,(error,data)=>{
            console.log("password sent");
            this.setState({sent:true});
        });
    }

	handleChange(key, event){
		let state = this.state;
		state[key] = event.target.value;
		this.setState(state);
	}
	render(){


		return (
			<div className="flex layout vertical center-center center-justified" style={{height:'100%'}} >
            {
                (!this.state.sent)?
                <div className="login-container layout vertical center-center center-justified">
					<img src="visor/images/logo.svg" width="200PX" height="auto"/>
					<h1>Visor de Mapas</h1>
					<h3>Recuperar Contraseña</h3>
                    <p>Ingrese su email para enviar un correo de restablecimiento de contraseña</p>

					<form>
						<TextField
							type="email"
							floatingLabelStyle={styles.floatingLabelStyle}
							floatingLabelText="Email"
							value = {this.state.email}
							onChange = {(e)=>{this.handleChange('email',e);}}
							fullWidth
							required
							inputStyle={{color:'white'}}
							/>



						<RaisedButton label="Enviar email" fullWidth disabled={this.state.loading} primary={true} onTouchTap={this.resetMyPassword.bind(this)} />

					</form>
				</div>
                :
                <div className="login-container layout vertical center-center center-justified">
					<img src="visor/images/logo.svg" width="200PX" height="auto"/>
					<h1>Visor de Mapas</h1>
					<h3>Recuperar Contraseña</h3>
                    <p>Se envió un correo a {this.state.email} para restablecer la contraseña</p>
                </div>

            }


			</div>
		);
	}
}
