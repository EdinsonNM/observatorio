import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import BaseMaps from './libs/BaseMaps';
import Paper from 'material-ui/Paper';
import AutoComplete from 'material-ui/AutoComplete';
import IconButton from 'material-ui/IconButton';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import Subheader from 'material-ui/Subheader';

const style={
  appbar:{
    backgroundColor:'var(--paper-cyan-900)'
  }
}
export default class Index extends React.Component{
    constructor(props) {
        super(props);
		this.state ={
			dataSource:['dsdsds','dasdas','dasdas d'],
			open:false
		}
    }
	componentDidMount(){
    	this.loadMap();
	}
	loadMap(){
		let self=this;
		this.map = new BaseMaps('map-container');
		this.map.create();
		this.map.createControlMousePosition();
			
	}
	handleUpdateInput(){

	}
	handleDrawerToggle(){
		this.setState({open:!this.state.open});
	}
    render() {
	    return (
	    	<div className="flex layout vertical center-center center-justified" style={{height:'100%',width:'100%'}} >

				<div id="map-container">		

				</div>
					<Paper className="searchbox"style={{width:'300px',top:'20px',left:'20px',height:'48px',position:'absolute'}}>
						<AutoComplete
						hintText="Busqueda por temática"
						dataSource={this.state.dataSource}
						onUpdateInput={this.handleUpdateInput}
						fullWidth={true}
						/>
						<FontIcon className="material-icons searchbox-icon">search</FontIcon>
						<span className="searchbox-icon-left">
							 <IconButton tooltip="Font Icon" onTouchTap={this.handleDrawerToggle.bind(this)}>
								<FontIcon className="material-icons">menu</FontIcon>
							</IconButton>
						</span>
					</Paper>
					 <Drawer open={this.state.open} docked={false}  onRequestChange={(open) => this.setState({open})} width={300}>
						<AppBar
						title="Temáticas"
						iconClassNameRight="menu"
						style={style.appbar}
						onLeftIconButtonTouchTap={this.handleDrawerToggle.bind(this)}
						/>
						
						
						<Subheader>Listado de Servicios por Temática</Subheader>
						<MenuItem href="#/dashboard/main">Inicio</MenuItem>
						<MenuItem href="#/dashboard/tematicas">Temáticas</MenuItem>
						<MenuItem href="#/dashboard/servicios">Mapas</MenuItem>

					</Drawer>
			</div>
	  	);
    }
}