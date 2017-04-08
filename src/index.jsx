import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
export default class Index extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
	    return (
	    	<div className="flex layout vertical center-center center-justified" style={{height:'100%'}} >
				<div className="login-container layout vertical center-center center-justified">
					<img src="images/logo.svg" width="200PX" height="auto"/>
					<h1>Sistema de Admisión</h1>
					<h3>Sistema integral para el registro y aprobación de postulantes</h3>
					<form>

						<RaisedButton label="Soy Estudiante" fullWidth  primary={true} o />
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