import React from 'react';
import ReactDOM from 'react-dom';
import TextField from 'material-ui/TextField';
import Auth from '../../services/Auth';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import nativeToast from 'native-toast'

const styles = {
  floatingLabelStyle: {
    color: "white",
  }

};

export default class Login extends React.Component{
	constructor () {
		super();
		this.state = {
			email:'',
			password:'',
			loading:false,
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


	

	handleChange(key, event){
		let state = this.state;
		state[key] = event.target.value;
		this.setState(state);
	}
	render(){


		return (
			<div className="flex layout vertical center-center center-justified" style={{height:'100%'}} >
				<div className="login-container layout vertical center-center center-justified">
					<img src="images/logo.svg" width="200PX" height="auto"/>
					<h1>Visor de Mapas</h1>
					<h3>Cuenca Chancay - Lambayeque</h3>
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
						<TextField
							floatingLabelStyle={styles.floatingLabelStyle}
							type="password"
							floatingLabelText="Password"
							value = {this.state.password}
							onChange = {(e)=>{this.handleChange('password',e);}}
							fullWidth
							required
							inputStyle={{color:'white'}}
							/>


						<RaisedButton label="Entrar" fullWidth disabled={this.state.loading} primary={true} onTouchTap={this.handleLogin.bind(this)} />
						<FlatButton
							disableTouchRipple
							fullWidth
							label="¿Olvide mi contraseña?"
							href={"#/forgot-password"}
							labelStyle={{color:'#ffffff'}}
							/>
			

					</form>
					</div>
					
			</div>
		);
	}
}
