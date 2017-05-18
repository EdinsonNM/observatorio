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
import MunicipalidadService from  '../../../services/MunicipalidadService';
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

export default class Gastos extends React.Component{
    constructor(props){
        super(props);
        this.state={
            // departamentos:DepartamentoService.getAll({}),
            title: 'Gasto Público',
            anios:[
                {id:2013,nombre:2013},
                {id:2014,nombre:2014},
                {id:2015,nombre:2015},
                {id:2016,nombre:2016},
                {id:2017,nombre:2017}
            ],
            municipalidades: [],
            municipalidad: null,
            tabIndex: 0,
            data:[]
        };

        this.handleChangeSelect = this.handleChangeSelect.bind(this);
    }

     handleChangeSelect(key, event, index, value){
        if (key === 'anio') {
            let munis = [];
            munis = MunicipalidadService.getByYear(value);
            this.setState({
                [key]: value,
                municipalidades: munis
            });
        }else if (key === 'municipalidad') {
            this.setState({
                [key]: value
            },()=>{
                this.getData();
            });
        }
    }

    toggleFilter(){
        this.setState({showFilter:!this.state.showFilter});
    }

    buildTableRows (data) {
        const tableRows = data.map((obj, idx) => {
            return (
                 <TableRow key={`tr-${idx}`}>
                    <TableRowColumn>{obj.ID_UBIGEO} </TableRowColumn>
                    <TableRowColumn>{obj.MUNICIPALIDAD} </TableRowColumn>
                    <TableRowColumn>{obj.MON_DEVENGADO} </TableRowColumn>
                    <TableRowColumn>{obj.MON_CERTIFICADO} </TableRowColumn>
                </TableRow>
            );
        });

        return tableRows;
    }

     buildSelectOptions (type) {
        let options = [];

        switch (type) {
            case "municipalidades":
                options = this.state.municipalidades.map((obj, idx) => {
                    return <MenuItem key={`mi-muni-${idx}`} value={obj.MUNICIPALIDAD} primaryText={obj.MUNICIPALIDAD} />;
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
        if (this.state.municipalidad) {
            let data = new MunicipalidadService.getGastos(this.state.anio,this.state.municipalidad);
            this.setState({data});
            this.toggleFilter();
        }
    }

    render (){
        const iconButton = <IconButton href="#/tematica/-KhDogAt_wkHk731PHh1/stats">
            <FontIcon className="material-icons" color="#006064">arrow_back</FontIcon>
        </IconButton>;
        const buttonFilter = <FlatButton icon={<FontIcon className="email" />} />;
        let tableRows = this.buildTableRows(this.state.data);

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

                    <div className="container-fluid">
                            <div className="row">

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

                                <div className="col-md-8">
                                    <SelectField
                                        fullWidth
                                        floatingLabelText="Municipalidad:"
                                        value={this.state.municipalidad}
                                        onChange={this.handleChangeSelect.bind(this, 'municipalidad')}
                                    >
                                        <MenuItem value={0} primaryText="Seleccionar" />
                                        {this.buildSelectOptions('municipalidades')}
                                    </SelectField>
                                </div>


                            </div>
                        </div>
                    <Table fixedHeader={true} selectable={false} multiselectable={false}>
                        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                            <TableRow>
                                <TableHeaderColumn>Cod. Ubigeo</TableHeaderColumn>
                                <TableHeaderColumn>Municipalidad</TableHeaderColumn>
                                <TableHeaderColumn>Monto Devengado</TableHeaderColumn>
                                <TableHeaderColumn>Monto Certificado</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            {tableRows}
                        </TableBody>
                    </Table>

                    <br/>

                    <ul>
                    <li><u>Monto Devengado</u>: Valor monetario pagado</li>
                    <li><u>Monto Certificado</u>: Valor monetario comprometido o planificado</li>
                    </ul>

                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="alert alert-info" role="alert">
                                    <strong>Fuente:</strong>  Este servicio de información ha sido desarrollado por el Ministerio del Ambiente-MINAM, a través de la Dirección General de Investigación e Información Ambiental-DGIIA.
                                </div>
                            </div>
                        </div>
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
