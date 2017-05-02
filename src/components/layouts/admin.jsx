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

import Menu from 'material-ui/svg-icons/navigation/menu';
const style={
  appbar:{
    color:'#c6c6c6',
	backgroundColor:'white'
  },
  title:{
	color:'#c6c6c6',
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
						title="Visor de Mapas de la Cuenca Chancay-Lambayeque"
						style={style.appbar}

						titleStyle={style.title}
						onLeftIconButtonTouchTap={this.handleDrawerToggle.bind(this)}
						iconElementLeft={<IconButton  iconStyle={{fill:'#c6c6c6'}}><Menu/></IconButton>}
					/>
				           <Sidebar ref="sidebar"/>

            		   {this.props.children}

      </div>
    );
  }
}
