import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import BaseMaps from './libs/BaseMaps';
import Paper from 'material-ui/Paper';
import AutoComplete from 'material-ui/AutoComplete';
import IconButton from 'material-ui/IconButton';
import Checkbox from 'material-ui/Checkbox';
import Toggle from 'material-ui/Toggle';

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
import TematicaService from './services/TematicaService';
import MapaService from './services/MapaService';

import _ from 'underscore';
let tematicaService=new TematicaService();
let mapaService=new MapaService();

const style={
  appbar:{
    backgroundColor:'var(--paper-cyan-900)'
  }
}
export default class Index extends React.Component{
    constructor(props) {
        super(props);
		this.state ={
			tematicas:[],
			mapas:[],
			tematicaSource:[],
			open:false
		}
    }
	loadData(){
		tematicaService.getAll({},(error,data)=>{
			let dataSource=[];
			data.forEach(function(item) {
				dataSource.push(item.titulo);
			}, this);
			this.setState({tematicas:data,tematicaSource:dataSource});
		},true);
	}
	loadMapas(tematicaId){
		mapaService.getAll({},(error,data)=>{
			item.visible = item.visible || false;
			let layers=[];
			data.forEach((item)=>{
				layers.push(new ol.layer.Tile({
					title: item.title,
					visible: item.visible,
					transparent: true,
					source: new ol.source.TileWMS({
						url: item.url,
						params: {'LAYERS': item.layer},
						serverType: item.serverType
					})
				}));
			});
			this.setState({mapas:data});
		},true,tematicaId);
	}
	componentDidMount(){
    	this.loadMap();
		this.loadData();
	}
	loadMap(){
		let self=this;
		this.map = new BaseMaps('map-container');
		this.map.create();
		this.map.createControlMousePosition();
			
	}
	handleUpdateInput(value){
		console.log(value);
		let tematica = _.find(this.state.tematicas, function(item){ return item.titulo.toLowerCase() == value.toLowerCase(); });
		if(tematica){
			console.log(tematica);
			this.loadMapas(tematica.id);
		}


	}
	handleDrawerToggle(){
		this.setState({open:!this.state.open});
	}
    render() {
	    return (
	    	<div className="flex layout vertical center-center center-justified" style={{height:'100%',width:'100%'}} >

				<div id="map-container">		

				</div>
				<div className="searchbox-container">
					<div className="row">
						<div className="col-md-4">

						</div>
						<div className="col-md-4">
							<Paper className="searchbox">
								<AutoComplete
								hintText="Busqueda por temática"
								openOnFocus={true}
								filter={AutoComplete.caseInsensitiveFilter}
								dataSource={this.state.tematicaSource}
								onUpdateInput={this.handleUpdateInput.bind(this)}
								fullWidth={true}
								/>
								<FontIcon className="material-icons searchbox-icon">search</FontIcon>
								<span className="searchbox-icon-left">
									<IconButton tooltip="Mostrar Servicios" onTouchTap={this.handleDrawerToggle.bind(this)}>
										<FontIcon className="material-icons">menu</FontIcon>
									</IconButton>
								</span>
							</Paper>
						</div>
						<div className="col-md-4">
							
						</div>
					</div>
					</div>
					 <Drawer open={this.state.open} docked={false}  onRequestChange={(open) => this.setState({open})} width={300}>
						<AppBar
						title="Temáticas"
						iconClassNameRight="menu"
						style={style.appbar}
						onLeftIconButtonTouchTap={this.handleDrawerToggle.bind(this)}
						/>
						
						
						<Subheader>Listado de Servicios por Temática</Subheader>
						<List>
						{
							this.state.mapas.map((item)=>{
								return <ListItem primaryText={item.title}  rightToggle={<Toggle />} />
							})
						}
						</List>

					</Drawer>
			</div>
	  	);
    }
}