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
const style10 = {
    width: '12%',
    paddingLeft: '8px',
    paddingRight: '8px'
};
const style20 = {
    width: '18%',
    paddingLeft: '8px',
    paddingRight: '8px'
};
const outterBorder = {
    margin: '20px',
    border: '1px solid #e1e1e1',
    borderRadius: '4px'
};

const generateAnios = () => {
    let currentYear = new Date().getFullYear();
    let anios = [];
    for (let i=currentYear-6; i<=currentYear; i++) {
        anios.push({
            id: i,
            nombre: i
        });
    }
    return anios;
};

export default class Gastos extends React.Component{
    constructor(props){
        super(props);
        this.state={
            departamentos:DepartamentoService.getAll({}),
            title: 'Gasto Público',
            anios: generateAnios(),
            municipalidades: [],
            municipalidad: null,
            anio: null,
            tabIndex: 0,
            data:[]
        };

        this.handleChangeSelect = this.handleChangeSelect.bind(this);
    }

    componentDidMount(){
        setTimeout(()=>{
            this.Layer = this.props.map.AddDptoInteractionSelect((error,data)=>{
                this.setState({departamento:data.FIRST_IDDP},()=>{
                    let service = new MunicipalidadService();
                    service.getAll(data.FIRST_IDDP, () => {
                        let data = [];
                        if(this.state.anio)
                            data = MunicipalidadService.getAllGastos(this.state.anio);
                        if(this.state.municipalidad)
                            data = MunicipalidadService.getGastos(this.state.anio, value);
                        this.setState({
                            data
                        });
                    });
                });

            });
        },2000);
       
    }

     handleChangeSelect(key, event, index, value){
        if (key === 'anio') {
            let munis = MunicipalidadService.getByYear(value);

            this.setState({
                [key]: value,
                municipalidades: munis
            });
        } else if (key === 'municipalidad') {
            let data;

            if (value <= -1) {
                data = [];
            } else if (value == 0) {
                data =  MunicipalidadService.getAllGastos(this.state.anio);
            } else {
                data = MunicipalidadService.getGastos(this.state.anio, value);
            }
            this.setState({
                [key]: value,
                data
            });
        } else if (key==='departamento'){
            let service = new MunicipalidadService();
            service.getAll(value,() =>{
                let data = [];
                if(this.state.anio)
                    data = MunicipalidadService.getAllGastos(this.state.anio);
                if(this.state.municipalidad)
                    data = MunicipalidadService.getGastos(this.state.anio, value);
                this.setState({
                    [key]: value,
                    data
                });
            });
            
        }
    }

    toggleFilter(){
        this.setState({showFilter:!this.state.showFilter});
    }

    buildTableRows (data) {

        const tableRows = data.map((obj, idx) => {
            return (
                 <tr key={`tr-${idx}`}>
                    <td style={style10}>{obj.ID_UBIGEO} </td>
                    <td >{obj.MUNICIPALIDAD} </td>
                    <td style={style20}>{obj.MON_DEVENGADO} </td>
                    <td style={style20}>{obj.MON_CERTIFICADO} </td>
                </tr>
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
            case "departamentos":
                options = this.state.departamentos.map((obj, idx) => {
                    return <MenuItem key={`mi-dep-${idx}`} value={obj.codigo_ubigeo} primaryText={obj.nombre_ubigeo} />;
                })
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
                            <div className="col-md-12">
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

                            <div className="col-md-8">
                                <SelectField
                                    fullWidth
                                    floatingLabelText="Municipalidad:"
                                    value={this.state.municipalidad}
                                    onChange={this.handleChangeSelect.bind(this, 'municipalidad')}
                                >
                                    <MenuItem value={-1} primaryText="Seleccionar" />
                                    <MenuItem value={0} primaryText="Todas" />
                                    {this.buildSelectOptions('municipalidades')}
                                </SelectField>
                            </div>
                        </div>
                    </div>

                    <br/>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <table className="table table-bordered" style={{width:'100%', fontSize:'12px'}}>
                                    <thead displaySelectAll={false} adjustForCheckbox={false}>
                                        <tr>
                                            <th><abbr title="Código de Ubigeo">Cod. Ub</abbr></th>
                                            <th>Municipalidad</th>
                                            <th><abbr title="Monto Devengado">M. Deveng.</abbr></th>
                                            <th><abbr title="Monto Certificado">M. Certif.</abbr></th>
                                        </tr>
                                    </thead>
                                    <tbody displayRowCheckbox={false}>
                                        {tableRows}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
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
