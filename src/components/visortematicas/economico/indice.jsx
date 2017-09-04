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

import SelectField from 'material-ui/SelectField';
import DepartamentoService from '../../../services/DepartamentoService';
import ProvinciaService from '../../../services/ProvinciaService';
import DistritoService from '../../../services/DistritoService';
import IDHService from '../../../services/IDHService';
import _ from 'underscore';
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

export default class Indice extends React.Component{
    constructor(props){
        super(props);
        this.state={
            showFilter:false,
            departamentos: [],
            provincias: [],
            distritos: [],
            title: 'Indice de Desarrollo Humano',
            tabIndex: 0,
            data:[]
        };

        this.handleChangeSelect = this.handleChangeSelect.bind(this);
        this.handleChangeTab = this.handleChangeTab.bind(this);
    }

    componentDidMount() {
        let departamentos = DepartamentoService.getAll({});
        this.setState({departamentos});
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
            default:
                this.setState({
                    [key]: value
                },()=>{
                    this.getData();
                });
        }
    }

    handleChangeTab (value) {
        this.setState({tabIndex: value});
    }

    toggleFilter(){
        this.setState({showFilter:!this.state.showFilter});
    }

    buildTableRows (data) {
        const tableRows = [];

        data.forEach((obj, idx) => {
            if (idx > 0) {
                tableRows.push(
                    <TableRow key={`tr-${idx}`}>
                        <TableRowColumn>{obj[0]} </TableRowColumn>
                        <TableRowColumn>{obj[1]} </TableRowColumn>
                    </TableRow>
                );

            }
        });

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
        let service = new IDHService();
        let ubigeo = `${this.state.departamento}${this.state.provincia}${this.state.distrito}`;

        service.getAll(ubigeo, (error, data) => {

            this.toggleFilter();
            let dataR=[ ['Año', 'Indice por Año']];
            data = _.sortBy(data, function(item){ return item.ID_ANIO; });
            data.forEach((item) => {
                dataR.push([item.ID_ANIO, item.IDH*1]);
            });

            console.log(dataR);
            this.setState({data:dataR});
        });
    }

    buildDataForExport(data) {
        let content = 'Año, Indice\n';
        let dataString = '';

        data.forEach((obj, idx) => {
            if (idx > 0) {
                dataString = obj.join(', ');
                content += idx < data.length ? dataString + '\n' : dataString;
            }
        });

        return content;
    }

    export() {
        var dataType = 'data:text/csv;charset=utf-8,%EF%BB%BF';
        var csvContent = this.buildDataForExport(this.state.data);

        var a = document.createElement('a');
        a.href = dataType + encodeURI(csvContent);
        a.download = 'tabla_gastos_' + moment().format("YYYY-MM-DD-HH-mm-ss").replace(/-/g, '') + '.csv';
        a.click();
    }

    render (){
        const iconButton = <IconButton href="#/tematica/-KhDogAt_wkHk731PHh1/stats">
            <FontIcon className="material-icons" color="#006064">arrow_back</FontIcon>
        </IconButton>;
        const iconButtonExport = <IconButton onClick={this.export.bind(this)}>
            <FontIcon className="material-icons" color="#006064">file_download</FontIcon>
        </IconButton>;
        const buttonFilter = <FlatButton icon={<FontIcon className="email" />} />;
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
        return(
            <div className="tematica-home">
                <AppBar
                    title={this.state.title}
                    iconElementLeft={iconButton}
                    style={style.appbar}
                    titleStyle={{color:'black'}}
                    iconElementRight={iconButtonExport}
                />

                <div className="col-md-12" className="tematica-home-container">
                    <Tabs onChange={this.handleChangeTab} value={this.state.tabIndex}>
                        <Tab label="Gráfica" value={0} icon={<FontIcon className="material-icons">multiline_chart</FontIcon>}>
                            <div className="text-filter">Aplique un filtro teniendo en cuenta uno o mas criterios.</div>
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

                            </div>
                        </div>

                            <div className={'my-pretty-chart-container'}>
                                {
                                    (this.state.data.length>1) ?
                                    <Chart
                                        chartType="AreaChart"
                                        data={this.state.data}
                                        options={{
                                            title: 'Indice de Desarrollo Humano',
                                            curveType: 'function',
                                            legend: { position: 'top' },
                                            hAxis: {
                                                title: 'Año'
                                            },
                                            vAxis: {
                                                title: 'Indice'
                                            }
                                        }}
                                        graph_id="AreaChart"
                                        width="100%"
                                        height="400px"
                                        legend_toggle
                                    />
                                    :
                                    <div className="alert alert-warning" role="alert">
                                        No hay datos que mostrar
                                    </div>
                                }
                            </div>
                        </Tab>

                        <Tab label="Tabla" value={1} icon={<FontIcon className="material-icons">reorder</FontIcon>}>
                            <div>
                                <Table fixedHeader={true} selectable={false} multiselectable={false}>
                                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                                        <TableRow>
                                            <TableHeaderColumn>Año</TableHeaderColumn>
                                            <TableHeaderColumn>Índice</TableHeaderColumn>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody displayRowCheckbox={false}>
                                        {tableRows}
                                    </TableBody>
                                </Table>
                            </div>
                        </Tab>
                    </Tabs>

                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="alert alert-info" role="alert">
                                    <strong>Fuente:</strong>  Este servicio de información ha sido desarrollado por el Ministerio del Ambiente-MINAM, a través de la Dirección General de Investigación e Información Ambiental-DGIIA.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
