import React from 'react';
import ReactDOM from 'react-dom';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
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
import MapaService from '../../services/MapaService';
import Model from '../../models/Mapa';
import { hashHistory } from 'react-router';

import BaseMaps from '../../libs/BaseMaps';
let service = new MapaService();
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
export default class Tematica extends React.Component {
  constructor (props) {
    super(props);
     this.state = {
        id:0,
        codigo: '',
        nombre: '',
    };
  }


  componentDidMount(){
    let id=this.props.params.id;
    if(id){
      service.get(id,(error,data)=>{
        this.setState(data);
      });
    }
	this.loadMap();
  }
  loadMap(){
	 let self=this;
      this.map = new BaseMaps('map-container');
      this.map.create();
      this.map.createControlMousePosition();
     	var mylayers = BaseMaps.getLayers(this.map.getMap());
      	this.setState({layers:mylayers,value:1});
      	this.map.GetInfo((error,url)=>{
	            if(!error){
	              self.refs.info._open(url);
	            }
	      });
  }
  handleChange(key, event){
		let state = this.state;
		state[key] = event.target.value;
		this.setState(state);
	}
  handleSave(){
    if(this.state.id==0){
      let model = new Model(this.state);
      service.post(model,()=>{
          console.log('save ok...');
          hashHistory.goBack()
      });
    }else{

      let model = new Model(this.state);
      service.update(this.state.id,model,()=>{
          console.log('update ok...');
          hashHistory.goBack()
      });
    }

  }
  handleBack(){
    hashHistory.goBack()
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
          <Card>
            <CardHeader
            title="Registro de Periodo académico"
            subtitle="Admisión"
             avatar="images/user0.jpg"
            />

            <CardText >
            Ingrese todos los campos obligatorios y a continuación presione GRABAR para registrar la facultad.
            <div className="row">
                <div className="col-md-7">
                    <TextField 
                    onChange = {(e)=>{this.handleChange('title',e);}}
                    value = {this.state.title} 
                    floatingLabelText="Título" 
                    required
                    fullWidth/>
					 <TextField 
                    onChange = {(e)=>{this.handleChange('serverType',e);}}
                    value = {this.state.serverType} 
                    floatingLabelText="Tipo de Servidor" 
                    required
                    fullWidth/>
					 <TextField 
                    onChange = {(e)=>{this.handleChange('url',e);}}
                    value = {this.state.url} 
                    floatingLabelText="Url" 
                    required
                    fullWidth/>
                </div>
               
               <div className="col-md-5">
                   <div id="map-container">

				   </div>
                </div>
				
            </div>
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
  
            </CardText>
        </Card>
    );
  }
}
