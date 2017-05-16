import React from 'react';
import { render } from 'react-dom';
import { Chart } from 'react-google-charts';
import {Line} from 'react-chartjs';

import {Tabs, Tab} from 'material-ui/Tabs';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {grey400, darkBlack, lightBlack,pink500,teal500,cyan800,cyan100} from 'material-ui/styles/colors';
import {List, ListItem,makeSelectable} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import {CardHeader} from 'material-ui/Card';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import SelectField from 'material-ui/SelectField';
import Chip from 'material-ui/Chip';

import DepartamentoService from '../../../services/DepartamentoService';
import ProvinciaService from '../../../services/ProvinciaService';
import DistritoService from '../../../services/DistritoService';
import VariableService from '../../../services/VariableEstacionService';
import DataService from '../../../services/DataEstacionService';
import EstacionService from '../../../services/EstacionService';
import PeriodoService from '../../../services/PeriodoEstacionService';
import moment from 'moment';

let SelectableList = makeSelectable(List);

moment.locale('es');

const style={
  appbar: {
    backgroundColor:'white'
  },
  chip: {
      margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    padding:10
  }
};


export default class Precipitaciones extends React.Component{
	constructor(props){
		super(props);
		this.state={
            listIndex:0,
            estacionesVisible:[],
			title: 'Precipitación y Temperatura',
            showFilter:false,
            departamentos: [],
            provincias: [],
            distritos: [],
            anios: [],
            meses: [],
            variables: [],
            estaciones: [],
            tabIndex: 0,
			data:[
                ['unidad', 'Por Dia'],
                [0, 0],   [1, 10],  [2, 23],  [3, 17],  [4, 18],  [5, 9],
                [6, 11],  [7, 27],  [8, 33],  [9, 40],  [10, 32], [11, 35],
                [12, 30], [13, 40], [14, 42], [15, 47], [16, 44], [17, 48],
                [18, 52], [19, 54], [20, 42], [21, 55], [22, 56], [23, 57],
                [24, 60], [25, 50], [26, 52], [27, 51], [28, 49], [29, 53],
                [30, 55], [31, 60], [32, 61], [33, 59], [34, 62], [35, 65],
                [36, 62], [37, 58], [38, 55], [39, 61], [40, 64], [41, 65],
                [42, 63], [43, 66], [44, 67], [45, 69], [46, 69], [47, 70],
                [48, 72], [49, 68], [50, 66], [51, 65], [52, 67], [53, 70],
                [54, 71], [55, 72], [56, 73], [57, 75], [58, 70], [59, 68],
                [60, 64], [61, 60], [62, 65], [63, 67], [64, 68], [65, 69],
                [66, 70], [67, 72], [68, 75], [69, 80]
            ]
		};

        this.handleChangeSelect = this.handleChangeSelect.bind(this);
        this.handleChangeTab = this.handleChangeTab.bind(this);
	}
    toggleFilter(){
        this.setState({showFilter:!this.state.showFilter});
    }

    componentDidMount() {
        let departamentos = DepartamentoService.getAll({});
        //let variables = VariableService.getAll({});
        this.setState({
        	departamentos
        });
        this.loadEstaciones();
    }

    loadEstaciones(){
        let estacionService=new EstacionService();
        let estaciones = estacionService.getAll({},(error,data)=>{
            let markers = [];
            var iconStyle = new ol.style.Style({
                image: new ol.style.Icon(({
                anchor: [0.5, 46],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                opacity: 0.75,
                src: 'visor/images/marker.png'
                //src: pointerimgsrc
                }))
            });


            data.forEach((item)=>{
                let  iconFeature = new ol.Feature({
                        geometry: new ol.geom.Point(ol.proj.transform([parseFloat(item.LON), parseFloat(item.LAT)], 'EPSG:4326', 'EPSG:3857')),
                        nombre: item.V_NOM_ESTA,
                        tipo: item.V_NOM_TIPO,
                        subtipo: item.V_NOM_STIPO,
                        lat:parseFloat(item.LAT),
                        lon:parseFloat(item.LON)
                    });
                iconFeature.setStyle(iconStyle);
                markers.push(iconFeature);
            });

            var vectorSource = new ol.source.Vector({features: markers });
            var vectorLayer = new ol.layer.Vector({source: vectorSource});
            this.props.AddLayer(vectorLayer);
            this.Layer = vectorLayer;
            let map = this.props.map.getMap();
            var size = map.getView().calculateExtent(map.getSize());


            var mapExtent = map.getView().calculateExtent(map.getSize());
            console.log(size,map.getSize());
            this.vectorLayer = vectorLayer;
            let getVisibles = ()=>{
                var size = map.getView().calculateExtent(map.getSize());
                 var intersectedFeatures = [];
                 vectorLayer.getSource().forEachFeatureInExtent(size, function(e) {
                    intersectedFeatures.push(e);

                });
                this.setState({estacionesVisible:intersectedFeatures});
            }

            map.getView().on('change:center',getVisibles);

            getVisibles();


        });
    }

     handleRequestChange (event, index){
         let feature = this.state.estacionesVisible[index];
         let estacion = feature.getProperties();
         console.log(estacion);

	  //this.props.map.getMap().getView().setCenter(ol.proj.transform([estacion.lon, estacion.lat], 'EPSG:4326', 'EPSG:3857'))
        var iconStyleSelected = new ol.style.Style({
            image: new ol.style.Icon(({
            anchor: [0.5, 46],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            opacity: 0.75,
            src: 'visor/images/marker-selected.png'
            //src: pointerimgsrc
            }))
        });
        var iconStyle = new ol.style.Style({
                image: new ol.style.Icon(({
                anchor: [0.5, 46],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                opacity: 0.75,
                src: 'visor/images/marker.png'
                //src: pointerimgsrc
                }))
            });
         if(this.selectedFeature){
             this.selectedFeature.setStyle(iconStyle);
         }

        feature.setStyle(iconStyleSelected);
        this.selectedFeature = feature;
      this.setState({
        listIndex: index,
      });
    }


    handleChangeSelect(key, event, index, value){
        switch (key) {
            case 'departamento':
                let provincias = ProvinciaService.getAll(DepartamentoService.get(value).id_ubigeo, {});

                this.setState({
                    [key]: value,
                    provincias
                });
                break;
            case 'provincia':
                let distritos = DistritoService.getAll(ProvinciaService.get(DepartamentoService.get(this.state.departamento).id_ubigeo,value).id_ubigeo,{});

                this.setState({
                    [key]: value,
                    distritos
                });
                break;
             case 'distrito':
                let distrito = "051"+this.state.departamento+this.state.provincia+value;
                let estacionService=new EstacionService();
                let estaciones = estacionService.getByDistrito(distrito);
                this.setState({
                    [key]: value,
                    estaciones
                });
                console.log(distrito);

                break;
            case 'estacion':
                this.setState({ [key]: value  });
                let serviceParam = new VariableService();
                let servicePeriodo = new PeriodoService();
                serviceParam.getAll({idEstacion:value},(error,params)=>{
                    if(error) return console.log(error);
                    servicePeriodo.getAll({idEstacion:value},(error,periodos)=>{
                        if(error) return console.log(error);
                        this.setState({ variables:params, meses:periodos });
                    });
                });
                break;

            default:
                this.setState({
                    [key]: value
                });
        }
    }


    handleChangeTab (value) {
        this.setState({tabIndex: value});
    }

    buildTableRows (data) {
    	let tableRows = [];

    	for (let idx=1; idx<data.length; idx++) {
            if (idx % 2 === 0) {
                tableRows.push(
                    <TableRow key={`tr-${idx}`}>
                        <TableRowColumn>{` día ${data[idx][0]}`} </TableRowColumn>
                        <TableRowColumn>{`${data[idx][1]} mm`} </TableRowColumn>

                    </TableRow>
                );
            }
        }

        return tableRows;
    }

    buildSelectOptions (type) {
        let options = [];

        switch (type) {
            case "departamentos":
                options = this.state.departamentos.map((obj, idx) => {
                    return <MenuItem key={`mi-dep-${idx}`} value={obj.codigo_ubigeo} primaryText={obj.nombre_ubigeo} />;
                })
                break;
            case "provincias":
                options = this.state.provincias.map((obj, idx) => {
                    return <MenuItem key={`mi-prov-${idx}`} value={obj.codigo_ubigeo} primaryText={obj.nombre_ubigeo} />;
                });
                break;
            case 'distritos':
                options = this.state.distritos.map((obj, idx) => {
                    return <MenuItem key={`mi-dist-${idx}`} value={obj.codigo_ubigeo} primaryText={obj.nombre_ubigeo} />;
                });
                break;
        }

        return options;
    }

    getData(){
        let service = new DataService();
        let periodo = this.state.mes.split('-');
        service.getAll({
            idEstacion:this.state.estacion,
            anio:periodo[0],
            mes : periodo[1],
            param : this.state.variable
        },(error,data)=>{
            this.toggleFilter();
            let dataR=[ ['unidad', 'Por Dia']];
            data.forEach((item)=>{
                dataR.push([moment(item.D_FEC_PARA).date() ,parseFloat(item.VALOR)||0]);
            });
            console.log(dataR);
            this.setState({data:dataR});


        });
    }

    componentWillUnmount(){
        console.log("bye component...");
        this.props.map.RemoveLayer(this.Layer);
    }

    render (){
        let {estaciones,variables,anios,meses} = this.state;
        const iconButton = <IconButton href="#/tematica/-KhDkIXgXKSWQpblXLLk/stats">
            <FontIcon className="material-icons" color="#006064">arrow_back</FontIcon>
        </IconButton>;
        let tableRows = this.buildTableRows(this.state.data);

        let departamento_nombre = '';
        if (this.state.departamento) {
        	let obj_departamento = this.state.departamentos.find(obj => this.state.departamento == obj.codigo_ubigeo);
        	departamento_nombre = obj_departamento ? obj_departamento.nombre_ubigeo : '';
        }

        let provincia_nombre = '';
        if (this.state.provincia) {
        	let obj_provincia = this.state.provincias.find(obj => this.state.provincia == obj.codigo_ubigeo);
        	provincia_nombre = obj_provincia ? obj_provincia.nombre_ubigeo : '';
        }

        let distrito_nombre = '';
        if (this.state.distrito) {
        	let obj_distrito = this.state.distritos.find(obj => this.state.distrito == obj.codigo_ubigeo);
        	distrito_nombre = obj_distrito ? obj_distrito.nombre_ubigeo : '';
        }

        let estacion_nombre = '';
        if (this.state.estacion) {
        	let obj_estacion = this.state.estaciones.find(obj => this.state.distrito == obj.codigo_ubigeo);
        	estacion_nombre = obj_estacion ? obj_estacion.V_NOM_ESTA : '';
        }
        const iconButtonElement = (
            <IconButton
                touch={true}
                tooltip="more"
                tooltipPosition="bottom-left"
            >
                 <FontIcon className="material-icons" color="#006064">more_vert</FontIcon>
            </IconButton>
            );
        const rightIconMenu = (
        <IconMenu iconButtonElement={iconButtonElement}>
            <MenuItem>Ver reporte</MenuItem>

        </IconMenu>
        );
        return(
			<div className="tematica-home">
				<AppBar
    				title={this.state.title}
    				iconElementLeft={iconButton}
    				style={style.appbar}
                    titleStyle={{color:'black'}}
				/>

                <div className="col-md-12" className="tematica-home-container">
                    <Tabs onChange={this.handleChangeTab} value={this.state.tabIndex}>
                        <Tab label="Visibles" value={0} icon={<FontIcon className="material-icons">location_on</FontIcon>}>
                            	<SelectableList defaultValue={2}  value={this.state.listIndex}  onChange={this.handleRequestChange.bind(this)}>
                                <Subheader>Listado de Estaciones</Subheader>
                               {
                                   this.state.estacionesVisible.map((item,idx)=>{
                                        let estacion = item.getProperties();
                                       return(
                                            <ListItem
                                            value={idx}
                                            primaryText={estacion.nombre}
                                            secondaryText={estacion.subtipo}
                                            rightIconButton={rightIconMenu}
                                        />
                                       )
                                   })
                               }
                                </SelectableList>

                        </Tab>
                        <Tab label="Gráfica" value={1} icon={<FontIcon className="material-icons">multiline_chart</FontIcon>}>
                            <div className="text-filter">Realize busquedas de precipitaciones teniendo en cuenta uno o mas criterios.</div>

                            {
                                (!this.state.showFilter)?
                                <div className="text-filter" style={style.wrapper}>

                                	{this.state.departamento ? <Chip style={style.chip}>{departamento_nombre}</Chip> : null}
                                    {this.state.provincia ? <Chip style={style.chip}>{provincia_nombre}</Chip> : null}
                                    {this.state.distrito ? <Chip style={style.chip}>{distrito_nombre}</Chip> : null}
                                    {this.state.estacion ? <Chip style={style.chip}>{this.state.estacion}</Chip> : null}
                                    {this.state.anio ? <Chip style={style.chip}>{this.state.anio}</Chip> : null}
                                    {this.state.mes ? <Chip style={style.chip}>{this.state.mes}</Chip> : null}

                                    <span>
                                        <FloatingActionButton mini={true} secondary={true} onTouchTap={this.toggleFilter.bind(this)} zDepth={0}>
                                            <FontIcon className="material-icons" color="white">filter_list</FontIcon>
                                        </FloatingActionButton>
                                    </span>

                                </div>
                                :null
                            }

                            <div className={'my-pretty-chart-container'}>
                                <Chart
                                    chartType="LineChart"
                                    data={this.state.data}
                                    options={{}}
                                    graph_id="ScatterChart"
                                    width="100%"
                                    height="400px"
                                    legend_toggle
                                />
                            </div>
                        </Tab>

                        <Tab label="Tabla" value={2} icon={<FontIcon className="material-icons">reorder</FontIcon>}>
                            <div>
                                <Table fixedHeader={true} selectable={false} multiselectable={false}>
                                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                                        <TableRow>
                                            <TableHeaderColumn>Dia.</TableHeaderColumn>
                                            <TableHeaderColumn>Cant.</TableHeaderColumn>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody displayRowCheckbox={false}>
                                        {tableRows}
                                    </TableBody>
                                </Table>
                            </div>
                        </Tab>
                    </Tabs>
                    {
                        this.state.showFilter
                        ? <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-4">
                                    <SelectField
                                        fullWidth
                                        floatingLabelText="Departamento:"
                                        value={this.state.departamento}
                                        onChange={this.handleChangeSelect.bind(this, 'departamento')}
                                    >
                                        <MenuItem value={0} primaryText="Seleccionar" />
                                        {this.buildSelectOptions('departamentos')}
                                    </SelectField>
                                </div>
                                <div className="col-md-4">
                                    <SelectField
                                        fullWidth
                                        floatingLabelText="Provincia: "
                                        value={this.state.provincia}
                                        onChange={this.handleChangeSelect.bind(this, 'provincia')}
                                    >
                                        <MenuItem value={0} primaryText="Seleccionar" />
                                        {this.buildSelectOptions('provincias')}
                                    </SelectField>
                                </div>
                                <div className="col-md-4">
                                    <SelectField
                                        fullWidth
                                        floatingLabelText="Distrito: "
                                        value={this.state.distrito}
                                        onChange={this.handleChangeSelect.bind(this, 'distrito')}
                                    >
                                        <MenuItem value={0} primaryText="Seleccionar" />
                                        {this.buildSelectOptions('distritos')}
                                    </SelectField>
                                </div>
                                <div className="col-md-4">
                                    <SelectField
                                        fullWidth
                                        floatingLabelText="Estación: "
                                        value={this.state.estacion}
                                        onChange={this.handleChangeSelect.bind(this, 'estacion')}
                                    >
                                        <MenuItem value={0} primaryText="Seleccionar" />
                                        {
                                            estaciones.map(obj => <MenuItem key={`mi-est-${obj.C_COD_ESTA}`} value={obj.C_COD_ESTA} primaryText={obj.V_NOM_ESTA} />)
                                        }
                                    </SelectField>
                                </div>
                                <div className="col-md-4">
                                    <SelectField
                                        fullWidth
                                        floatingLabelText="Variable: "
                                        value={this.state.variable}
                                        onChange={this.handleChangeSelect.bind(this, 'variable')}
                                    >
                                        <MenuItem value={0} primaryText="Seleccionar" />
                                        {
                                            variables.map(obj => <MenuItem key={`mi-var-${obj.C_COD_PARAG}-${obj.C_COD_CORRP}`} value={obj.C_COD_PARAG+'||'+obj.C_COD_CORRP} primaryText={obj.V_NOM_PARA} />)
                                        }
                                    </SelectField>
                                </div>
                               <div className="col-md-4">
                                    <SelectField
                                        fullWidth
                                        floatingLabelText="Mes"
                                        value={this.state.mes}
                                        onChange={this.handleChangeSelect.bind(this, 'mes')}
                                    >
                                        <MenuItem value={0} primaryText="Seleccionar" />
                                        {
                                            meses.map(obj => <MenuItem key={`mi-mes-${obj.MES}-${obj.ANIO}`} value={obj.ANIO+'-'+obj.MES} primaryText={obj.ANIO+'-'+moment().month(parseInt(obj.MES)-1).format('MMMM')} />)
                                        }
                                    </SelectField>
                                </div>
                                <div className="col-md-12">
                                    <RaisedButton label="Cancelar" style={{marginTop:20,marginRight:20}} onTouchTap={this.toggleFilter.bind(this)} />
                                    <RaisedButton label="Filtrar" style={{marginTop:20}} primary={true} onTouchTap={this.getData.bind(this)}/>
                                </div>
                            </div>
                        </div>
                        : null
                    }
                    <div className="alert alert-info" role="alert">
                    <strong>Fuente:</strong>  Servicio Nacional de Meteorología e Hidrología del Perú-SENAMHI.
                    </div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12">

                            </div>
                        </div>
                    </div>

				</div>
			</div>
		);
	}
}
