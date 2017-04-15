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
import {pink500, teal500, blue500} from 'material-ui/styles/colors';
import {CardHeader} from 'material-ui/Card';


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
			tematica:{titulo:''},
			tematicas:[],
			mapas:[],
			tematicaSource:[],
			open:false,
			layers:[]
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
			
			let layers=[];
			data.forEach((item)=>{
				item.visible = item.visible || false;
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
			let group = new ol.layer.Group({
				type:'services',
				title: 'Servicios WMS',
				layers: layers,
			});
			this.map.AddLayer(group);
			var mylayers = BaseMaps.getLayers(this.map.getMap());
      		console.log(mylayers);
			this.setState({mapas:data,layers:mylayers});
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
			this.setState({tematica:tematica});
		}


	}
	handleDrawerToggle(){
		this.setState({open:!this.state.open});
	}
	handleService(item,itemIndex,groupIndex){
		item.ref.setVisible(!item.visible);
		console.log(item,itemIndex,groupIndex);
		let layers = this.state.layers;
		layers[groupIndex].items[itemIndex].visible = !item.visible;
		this.setState({layers:layers});
	}
    render() {
		let services=[];
		this.state.layers.map((group,groupIndex)=>{
			switch(group.type){
				case 'services':
					group.items.map((item,index)=>{
						services.push( <ListItem key={index} primaryText={item.title}  rightToggle={<Toggle toggled={item.visible} onToggle={this.handleService.bind(this,item,index,groupIndex)}/>} />);
					});
					break;
				case 'basemaps':
					break;
			}
			
		});
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
						title="Visor de Mapas"
						iconClassNameRight="menu"
						style={style.appbar}
						onLeftIconButtonTouchTap={this.handleDrawerToggle.bind(this)}
						/>
						<CardHeader
						style={{backgroundColor: '#006064'}}
						titleColor="#FFFFFF"
						subtitleColor="#FFFFFF"
						title={this.state.tematica.titulo}
						subtitle="Listado de Servicios"
						avatar={<Avatar icon={<FontIcon  className="material-icons" color={pink500}>view_carousel</FontIcon>} backgroundColor={teal500}/>}
						/>
						
						<List>
						{ services }
						</List>

					</Drawer>
			</div>
	  	);
    }
}