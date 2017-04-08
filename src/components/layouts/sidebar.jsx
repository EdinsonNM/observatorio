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

import Auth from '../../services/Auth';
import Users from '../../services/Users';
const style={
  appbar:{
    backgroundColor:'var(--paper-purple-700)'
  }
}
export default class Sidebar extends React.Component {
  constructor (props) {
    super(props);
    this.state={
      open:this.props.open
    };
  }
  handleDrawerToggle(){
    console.log("show/hide drawer...")
    this.setState({open: !this.state.open});
  } 

  componentDidMount(){

  }
  logout(){
    Auth.logout();
  }
  render(){
    
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
        <MenuItem>Mi Perfil</MenuItem>
        <MenuItem>Configuración</MenuItem>
        <MenuItem onTouchTap={this.logout.bind(this)}>Salir</MenuItem>
        </IconMenu>
        );
    let user = Users.me();
    return (
        <Drawer open={this.state.open} docked={false}  onRequestChange={(open) => this.setState({open})} width={300}>
            <AppBar
            title="Sistema de Admisión"
            iconClassNameRight="menu"
            style={style.appbar}
            onLeftIconButtonTouchTap={this.handleDrawerToggle.bind(this)}
            />
            <div className="logo-sidebar layout center-center">
            <img src="images/logo.svg" />
            </div>
            <ListItem
            leftAvatar={<Avatar src="images/user00.jpg" />}
            rightIconButton={rightIconMenu}
            primaryText={`${user.nombres} ${user.apellidos}`}  

            />
            <Subheader>Opciones</Subheader>
            <MenuItem href="#/dashboard/main">Inicio</MenuItem>
            <MenuItem href="#/dashboard/facultades">Facultades</MenuItem>
            <MenuItem href="#/dashboard/periodos">Periodos</MenuItem>
            <MenuItem href="#/dashboard/admisiones">Procesos de Admisión</MenuItem>
            <MenuItem >Registro de Postulantes</MenuItem>
            <MenuItem >Evaluación de Postulantes</MenuItem>
        </Drawer>
    );
  }
}
