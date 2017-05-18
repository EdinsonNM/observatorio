import React from 'react';
import { render } from 'react-dom';
import { Chart } from 'react-google-charts';

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
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
// import {pink500, teal500, blue500} from 'material-ui/styles/colors';
import {CardHeader} from 'material-ui/Card';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Chip from 'material-ui/Chip';
import _ from 'underscore';
import SelectField from 'material-ui/SelectField';
import DepartamentoService from '../../../services/DepartamentoService';
import DenunciaAmbientalService from  '../../../services/DenunciaAmbientalService';
import moment from 'moment';
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

export default class Denuncias extends React.Component{
	constructor(props){
		super(props);
		this.state={
            departamentos:DepartamentoService.getAll({}),
            anios:[
                {id:2014,nombre:2014},
                {id:2015,nombre:2015},
                {id:2016,nombre:2016},
            ],
            title: 'Denuncias Ambientales',
            tabIndex: 0,
			data1:[['unidad', 'Por Dia'],[1,1],[1,1]],
            data2:[['unidad', 'Por Dia'],['data',1],['data',1]]
		};

        this.handleChangeSelect = this.handleChangeSelect.bind(this);
        this.handleChangeTab = this.handleChangeTab.bind(this);
	}
    componentDidMount(){
         setTimeout(()=>{
            this.Layer = this.props.map.AddDptoInteractionSelect((error,data)=>{
                this.setState({departamento:data.FIRST_IDDP},()=>{
                    this.getData();
                });

            });
        },2000);
    }

     componentWillUnmount(){
        this.props.map.RemoveLayer(this.Layer);
    }

    handleChangeSelect(key, event, index, value){
        this.setState({
            [key]: value
        },()=>{
            this.getData();
        });
    }

    handleChangeTab (value) {
        this.setState({tabIndex: value});
    }
    toggleFilter(){
        this.setState({showFilter:!this.state.showFilter});
    }


    buildTableRows (data) {
    	let tableRows = [];

    	for (let idx=1; idx<data.length; idx++) {
            if (idx % 2 === 0) {
                tableRows.push(
                     <TableRow key={`tr-${idx}`}>
                        <TableRowColumn>{moment().month(parseInt(data[idx][0])-1).format('MMMM') } </TableRowColumn>
                        <TableRowColumn>{`${data[idx][1]} denuncias`} </TableRowColumn>
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
            case "anios":
                options = this.state.anios.map((obj, idx) => {
                    return <MenuItem key={`mi-prov-${idx}`} value={obj.id} primaryText={obj.nombre} />;
                });
                break;

        }

        return options;
    }

    getData(){
        if(this.state.departamento!=null&&this.state.anio!=null){
            let service = new DenunciaAmbientalService();
            service.getAll(this.state.anio,this.state.departamento,(error,data) => {
                let dataR1=service.getReport1(data);
                let dataR2=service.getReport2(data);
                console.log(dataR2);
                this.setState({data1:dataR1,data2:dataR2});
            });
        }
    }

    render (){
        const iconButton = <IconButton href="#/tematica/-KhDkIXgXKSWQpblXLLk/stats">
            <FontIcon className="material-icons" color="#006064">arrow_back</FontIcon>
        </IconButton>;
        const buttonFilter = <FlatButton icon={<FontIcon className="email" />} />;
        let tableRows = this.buildTableRows(this.state.data1);
        let departamento_nombre = '';
        if (this.state.departamento) {
        	let obj_departamento = this.state.departamentos.find(obj => this.state.departamento == obj.codigo_ubigeo);
        	departamento_nombre = obj_departamento ? obj_departamento.nombre_ubigeo : '';
        }

        let anio_nombre = '';
        if (this.state.anio) {
        	let obj_anio = this.state.anios.find(obj => this.state.anio == obj.id);
        	anio_nombre = obj_anio ? obj_anio.id : '';
        }

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
                        <Tab label="Gráfica" value={0} icon={<FontIcon className="material-icons">multiline_chart</FontIcon>}>
                            <div className="text-filter">Realize busquedas de precipitaciones teniendo en cuenta uno o mas criterios.</div>
                            <div className="container-fluid">
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
                                        floatingLabelText="Año: "
                                        value={this.state.anio}
                                        onChange={this.handleChangeSelect.bind(this, 'anio')}
                                    >
                                        <MenuItem value={0} primaryText="Seleccionar" />
                                        {this.buildSelectOptions('anios')}
                                    </SelectField>
                                </div>


                            </div>
                        </div>


                            <div className={'my-pretty-chart-container'}>
                                <Chart
                                    chartType="LineChart"
                                    data={this.state.data1}
                                     options={{
                                        title: 'Registro de Denuncias Ambientales',
                                        curveType: 'function',
                                        legend: { position: 'top' },
                                        hAxis: {
                                            title: 'Meses'
                                        },
                                        vAxis: {
                                            title: 'Denuncias Ambientales'
                                        }
                                    }}
                                    graph_id="ScatterChart"
                                    width="100%"
                                    height="400px"
                                    legend_toggle
                                />
                                <Chart
                                    chartType="PieChart"
                                    data={this.state.data2}
                                    options={{
                                        title: 'Denuncias por Medio Afectado',

                                    }}
                                    graph_id="ScatterChart2"
                                    width="100%"
                                    height="400px"
                                    legend_toggle
                                />
                            </div>

                        </Tab>

                        <Tab label="Tabla" value={1} icon={<FontIcon className="material-icons">reorder</FontIcon>}>
                            <div>
                                <Table fixedHeader={true} selectable={false} multiselectable={false}>
                                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                                        <TableRow>
                                            <TableHeaderColumn>Mes</TableHeaderColumn>
                                            <TableHeaderColumn>Denuncias.</TableHeaderColumn>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody displayRowCheckbox={false}>
                                        {tableRows}
                                    </TableBody>
                                </Table>
                            </div>
                        </Tab>
                    </Tabs>
                    <div className="alert alert-info" role="alert">
                    <strong>Fuente:</strong>  Servicio Nacional de Denuncias Ambientales-SINADA, Organismo de Evaluación y Fiscalización Ambiental-OEFA.
                    </div>



				</div>
			</div>
		);
	}
}
