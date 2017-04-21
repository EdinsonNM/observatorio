import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import BaseMaps from '../../libs/BaseMaps';
import Paper from 'material-ui/Paper';
import AutoComplete from 'material-ui/AutoComplete';
import IconButton from 'material-ui/IconButton';
import Checkbox from 'material-ui/Checkbox';
import Toggle from 'material-ui/Toggle';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
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
import TematicaService from '../../services/TematicaService';
import MapaService from '../../services/MapaService';
import {pink500, teal500, blue500} from 'material-ui/styles/colors';
import {CardHeader} from 'material-ui/Card';
import _ from 'underscore';

let tematicaService = new TematicaService();
let mapaService = new MapaService();

const style = {
	appbar:{
		backgroundColor: 'var(--paper-cyan-900)'
	}
};

export default class Index extends React.Component{
    constructor(props) {
        super(props);
		this.state ={
			tematica: {titulo: ''},
			tematicas: [],
			mapas: [],
			tematicaSource: [],
			open: false,
			layers: [],
			group: null,
			showclear: false,
			searchText: '',
			selectedBaseMap: 1,
			showbasemaps: false
		}
    }

	loadData(){
		let tematicaId=this.props.params.tematica;

		tematicaService.get(tematicaId,(error,tematica)=>{
			mapaService.getAll({},(error,layers)=>{
				this.setState({
					tematica:tematica,
					mapas:layers
				}, () => {
					this.addAllLayers();
				}, tematica.id);
			});
		});
	}

	addAllLayers(){
		let datasource = [];
		let layerItems = [];
		let tematica = this.state.tematica;
		let mapas = _.findWhere(this.state.mapas, {id:tematica.id});

		if (mapas) {
			Object.keys(mapas).forEach((layerId,indexLayer)=>{
				if (layerId!='id') {
					let item = mapas[layerId];

					item.visible = item.visible||false;
					layerItems.push(
						new ol.layer.Tile({
							title: item.title,
							visible: item.visible,
							transparent: true,
							source: new ol.source.TileWMS({
								url: item.url,
								params: {'LAYERS': item.layer},
								serverType: item.serverType
							})
						})
					);
					datasource.push(item.title);
				}
			});
		}

		let group = new ol.layer.Group({
			expanded: false,
			type: 'services',
			title: tematica.titulo,
			subtitle: tematica.subtitulo||'',
			layers: layerItems,
		});

		this.map.AddLayer(group);

		let mylayers = BaseMaps.getLayers(this.map.getMap());

		this.setState({layers:mylayers,tematicaSource:datasource});
	}

	componentDidMount(){
		this.loadMap();
		this.loadData();
		$("#layers").mCustomScrollbar({
			theme:'dark',
			axis: "y",
			scrollbarPosition: "inside",
			contentTouchScroll: true,
			autoHideScrollbar: true,
			advanced:{ updateOnImageLoad: true, updateOnSelectorChange: "li" },
			setTop: 30,
			keyboard:{ enable: true }
		});
	}

	loadMap(){
		let self=this;

		this.map = new BaseMaps('map-container');
		this.map.create();
		//this.map.createControlMousePosition();
		var mylayers = BaseMaps.getLayers(this.map.getMap());
		this.setState({layers:mylayers});
		this.map.GetInfo((error,url)=>{
			if(!error){
				console.log(url);
			}
		});
	}

	handleUpdateInput(value){
		let showclear=false;

		if (value!='') {
			showclear=true;
		}

		this.state.layers.map((group, groupIndex)=>{
			if (group.type=='services') {
				group.items.map((item, index)=>{
					if (item.title==value) {
						item.ref.setVisible(true);
						item.visible = true;
						group.expanded = true;
					} else {
						item.ref.setVisible(false);
						item.visible = false;
					}
				});
			}
		});

		this.setState({
			showclear:showclear,
			searchText:value,
			layers:this.state.layers
		});
	}

	handleDrawerToggle(){
		this.setState({open:!this.state.open});
	}

	clearSearchBox(){
		this.setState({
			tematica: {titulo:''},
			showclear: false,
			searchText: ''
		});
	}

	handleService(item,itemIndex,groupIndex){
		item.ref.setVisible(!item.visible);
		console.log(item, itemIndex, groupIndex);

		let layers = this.state.layers;

		layers[groupIndex].items[itemIndex].visible = !item.visible;
		this.setState({layers:layers});
		//$(".services-list").mCustomScrollbar("scrollTo");
	}

	selectBaseMap(item,index,items){
		items[this.state.selectedBaseMap].ref.setVisible(false);
		item.ref.setVisible(true);
		this.setState({selectedBaseMap:index});
	}

	handleBaseMaps(){
		this.setState({showbasemaps:!this.state.showbasemaps});
	}

	handleExpandedTematica(group,index){
		let layers = this.state.layers;
		layers[index].expanded=!group.expanded;
		this.setState({layers:layers});
	}

	render() {
		const recentsIcon = <FontIcon className="material-icons">restore</FontIcon>;
		const favoritesIcon = <FontIcon className="material-icons" style={{width:'24px',margin:'auto'}}>maps</FontIcon>;
		let services=[];
		let basemaps=[];
		let tematicas=[];

		this.state.layers.map((group,groupIndex)=>{
			switch(group.type){
				case 'services':
					services=[];
					group.items.map((item, index)=>{
						services.push(
							<ListItem
								key={item.id}
								primaryText={item.title}
								rightToggle={<Toggle toggled={item.visible} onToggle={this.handleService.bind(this,item,index,groupIndex)}/>}
							/>
						);
					});

					break;
				case 'basemaps':
					group.items.map((item, index)=>{
						basemaps.push(
							<BottomNavigationItem
								label={item.title}
								icon={favoritesIcon}
								onTouchTap={() => this.selectBaseMap(item,index,group.items)}
							/>
						);
					});

					break;
			}

		});

		let classBaseMaps="basemap-container";

		if(!this.state.showbasemaps){
			classBaseMaps+=" hidden-basemap"
		}
	    return (
	    	<div className="flex layout horizontal center-center center-justified visor-tematica-container" style={{height:'100%',width:'100%'}} >
				<div className="tematica-map-container">

					<div id="map-container"></div>
					<div className="searchbox-container">
						<div className="row">
							<div className="col-md-12">
								<Paper className="searchbox">
									<AutoComplete
										hintText="Busqueda por servicio"
										openOnFocus={false}
										filter={AutoComplete.caseInsensitiveFilter}
										dataSource={this.state.tematicaSource}
										onUpdateInput={this.handleUpdateInput.bind(this)}
										fullWidth={true}
										searchText={this.state.searchText}
										maxSearchResults={10}
									/>
									<span className="searchbox-icon">
										{
											this.state.showclear
											?
												<IconButton tooltip="Mostrar Servicios" onTouchTap={this.clearSearchBox.bind(this)}>
													<FontIcon className="material-icons">clear</FontIcon>
												</IconButton>
											:
												<IconButton tooltip="Buscar" onTouchTap={this.handleDrawerToggle.bind(this)}>
													<FontIcon className="material-icons" color="#c3c3c3" >search</FontIcon>
												</IconButton>
										}
										<IconButton tooltip="Seleccionar mapa base"  onTouchTap={this.handleBaseMaps.bind(this)}>
											<FontIcon className="material-icons" color={(this.state.showbasemaps)?"#00BCD4":"#c3c3c3"}>maps</FontIcon>
										</IconButton>
									</span>

									<span className="searchbox-icon-left">
										<IconButton tooltip="Mostrar Servicios" onTouchTap={this.handleDrawerToggle.bind(this)}>
											<FontIcon className="material-icons">menu</FontIcon>
										</IconButton>
									</span>
								</Paper>
							</div>

						</div>
					</div>
					<Paper className={classBaseMaps} style={{position:'absolute'}}>

					<BottomNavigation selectedIndex={this.state.selectedBaseMap}>
						{basemaps}
					</BottomNavigation>
				</Paper>
				</div>

				<div className="tematica-stats-container">
					{ this.props.children }
				</div>

				 <Drawer open={this.state.open} docked={false}  onRequestChange={(open) => this.setState({open})} width={350} containerStyle={{display:'flex',flexDirection:'column'}}>
					<AppBar
						title="Visor de Mapas"
						iconClassNameRight="menu"
						style={style.appbar}
						onLeftIconButtonTouchTap={this.handleDrawerToggle.bind(this)}
					/>
					<CardHeader
						textStyle={{paddingRight:0}}
						style={{backgroundColor: '#006064'}}
						titleColor="#FFFFFF"
						titleStyle={{
							width: '200px',
							whiteSpace: 'nowrap',
							overflow: 'hidden',
							textOverflow: 'ellipsis'
							}}
						subtitleColor="#FFFFFF"
						title={(this.state.tematica)?this.state.tematica.titulo:''}
						subtitle="Listado de Servicios"
						avatar={<Avatar icon={<FontIcon  className="material-icons" color={pink500}>view_carousel</FontIcon>} backgroundColor={teal500}/>}
					/>
					<div className="services-list" style={{flex:1,overflow:'hidden',marginRight:'5px',position:'relative'}}>
						<div id="layers" className="mCustomScrollbar" style={{flex:1,overflow:'hidden',height:'100%'}}>
							<List>{services}</List>
						</div>
					</div>
				</Drawer>

			</div>
	  	);
    }
}
