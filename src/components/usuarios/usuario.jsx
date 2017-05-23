import React from 'react';
import ReactDOM from 'react-dom';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import {grey400, darkBlack, lightBlack, pink500, teal500} from 'material-ui/styles/colors';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import Subheader from 'material-ui/Subheader';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import DatePicker from 'material-ui/DatePicker';
import Checkbox from 'material-ui/Checkbox';
import UserService from '../../services/UserService';
import Model from '../../models/User';
import { hashHistory } from 'react-router';
import PasswordGenerator from 'random-password-generator';
import { browserHistory } from 'react-router'

let service = new UserService();
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,

} from 'material-ui/Stepper';
const style={
  appbar:{
    backgroundColor:'var(--paper-purple-700)'
  }
}
export default class Usuario extends React.Component {
  constructor (props) {
    super(props);
    let password = PasswordGenerator.generate();
    password = password.replace(new RegExp('undefined', 'g'),'');
     this.state = this.props.data||{password:password,isAdmin:false};
  }

  generarPassword(){
    let password = PasswordGenerator.generate();
    password = password.replace(new RegExp('undefined', 'g'),'');
    this.setState({password:password});
  }


  componentDidMount(){
    /*let id=this.props.params.id;
    if(id){
      service.get(id,(error,data)=>{
        this.setState(data);
      });
    }*/
  }
  handleChange(key, event){
		let state = this.state;
		state[key] = event.target.value;
		this.setState(state);
	}
  handleChangeCheck(key, value){
		let state = this.state;
		state[key] = value;
		this.setState(state);
	}
  handleSave(){
    if(!this.props.edit){
      let model = new Model(this.state);
      console.log(model);
      service.post(model,()=>{
          console.log('save ok...');
          this.handleBack();
      });
    }else{

      let model = new Model(this.state);
      service.update(this.state.id,model,()=>{
          console.log('update ok...');
          this.handleBack();
      });
    }

  }
  handleBack(){
   browserHistory.goBack();
  }
  render(){
    const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 16px'};
    const iconButtonElement = (
        <IconButton
        touch={true}
        tooltip="more"
        tooltipPosition="bottom-left"
        >
        <MoreVertIcon color={grey400} />
        </IconButton>
        );
    const rightIconMenu = (
        <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem>Reply</MenuItem>
        <MenuItem>Forward</MenuItem>
        <MenuItem>Delete</MenuItem>
        </IconMenu>
        );

    return (
          <div className="flex layout vertical center-center " style={{width:'100%',height:'100%'}}>
            <Card  style={{width:'100%',height:'100%'}}>
            <CardHeader
            title="Registro de Usuarios"
            subtitle="Usuarios del sistema"
             avatar={<Avatar icon={<FontIcon  className="material-icons" color={pink500}>view_carousel</FontIcon>} backgroundColor={teal500}/>}
            />

            <CardText >

            <div className="container">
            <div className="row">
                <div className="col-md-12">
                Ingrese todos los campos obligatorios y a continuación presione GRABAR para registrar la facultad.
                </div>
                <div className="col-md-6">
                    <TextField
                    onChange = {(e)=>{this.handleChange('nombres',e);}}
                    value = {this.state.titulo}
                    floatingLabelText="Nombres"
                    required
                    fullWidth/>
                </div>
				 <div className="col-md-6">
                    <TextField
                    onChange = {(e)=>{this.handleChange('apellidos',e);}}
                    value = {this.state.subtitulo}
                    floatingLabelText="Apellidos"
                    required
                    fullWidth/>
                </div>
                <div className="col-md-6">
                    <TextField
                    onChange = {(e)=>{this.handleChange('email',e);}}
                    value = {this.state.descripcion}
                    floatingLabelText="E-mail"
                    required
                    fullWidth/>
                </div>
               <div className="col-md-6">
                  Contraseña: <br/>
                  <h3>
                  <span className="badge badge-default">{this.state.password}</span>&nbsp;
                  <button type="button" className="btn btn-secondary btn-sm" onClick={this.generarPassword.bind(this)}>Generar Nueva Contraseña</button>
                  </h3>
                </div>
                <div className="col-md-6">
                 <Checkbox
                 onCheck = {(e,value)=>{this.handleChangeCheck('isAdmin',value);}}
                value = {this.state.admin}
                 label="Usuario administrador" />
                </div>
                <div className="col-md-12">
                <FlatButton
                  label="Volver"
                  disabled={stepIndex === 0}
                  onTouchTap={this.handleBack.bind(this)}
                  style={{marginRight: 12}}
                />
                <RaisedButton
                  label='Grabar'
                  primary={true}
                  onTouchTap={this.handleSave.bind(this)}
                />

                </div>
            </div>
            </div>

            </CardText>
        </Card>

        </div>
    );
  }
}
