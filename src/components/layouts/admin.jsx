import React from 'react';
import ReactDOM from 'react-dom';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import Subheader from 'material-ui/Subheader';


const style={
  appbar:{
    backgroundColor:'var(--paper-purple-700)'
  }
}

import Sidebar from './sidebar';
export default class Admin extends React.Component {
  constructor () {
    super();
    this.state={
      open:false,
      rowHeight:200
    };
  }
  handleDrawerToggle(){
    this.refs.sidebar.handleDrawerToggle();
    //this.setState({open: !this.state.open});
  } 

  componentDidMount(){

  }
  render(){
     return (
      <div className="flex layout vertical center-center " style={{width:'100%',height:'100%'}}>
        <AppBar
            title="Visor de Mapas"
            iconClassNameRight="menu"
            style={style.appbar}
            onLeftIconButtonTouchTap={this.handleDrawerToggle.bind(this)}
          />
          <Sidebar ref="sidebar"/>
          <div className="flex layout vertical scroll center main-scroll" style={{overflowX:'hidden'}}>
            <div className="main-container">
             {this.props.children}
            </div>
          </div>
      </div>
    );
  }
}
