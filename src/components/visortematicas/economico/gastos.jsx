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
import PBIService from  '../../../services/PBIService';
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
            departamentos:DepartamentoService.getAll({}),
            anios:[
                {id:2010,nombre:2010},
                {id:2011,nombre:2011},
                {id:2012,nombre:2012},
                {id:2013,nombre:2013},
                {id:2014,nombre:2014},
                {id:2015,nombre:2015},
                {id:2016,nombre:2016},
            ],
            title: 'PBI Por Actividades Económicas',
            tabIndex: 0,
            data:[]
        };

        this.handleChangeSelect = this.handleChangeSelect.bind(this);
        this.handleChangeTab = this.handleChangeTab.bind(this);
    }

    handleChangeSelect(key, event, index, value){
        this.setState({
            [key]: value
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
                        <TableRowColumn>{data[idx][0]} </TableRowColumn>
                        <TableRowColumn>{`S/. ${data[idx][1]}`} </TableRowColumn>
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
        let service = new PBIService();
        service.getAll(this.state.anio,this.state.departamento,(error,data) => {

            this.toggleFilter();
            let dataR=[ ['unidad', 'Por Dia']];
            data.forEach((item)=>{
                dataR.push([parseInt(item.mes) ,parseFloat(item.nr)||0]);
            });

            const transData = service.transformData(data);

            console.log(dataR);
            console.log(transData);
            this.setState({data:transData});


        });
    }

    render (){
        const iconButton = <IconButton href="#/tematica/-KhDogAt_wkHk731PHh1/stats">
            <FontIcon  className="material-icons" >arrow_back</FontIcon>
        </IconButton>;
        const buttonFilter = <FlatButton icon={<FontIcon className="email" />} />;
        let tableRows = this.buildTableRows(this.state.data);
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
                            <div className="text-filter">Aplique un filtro teniendo en cuenta uno o mas criterios.</div>

                            {
                                (!this.state.showFilter)?
                                <div className="text-filter" style={style.wrapper}>

                                    {this.state.departamento ? <Chip style={style.chip}>{departamento_nombre}</Chip> : null}
                                    {this.state.anio ? <Chip style={style.chip}>{anio_nombre}</Chip> : null}

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
                                    graph_id="LineChart"
                                    width="100%"
                                    height="400px"
                                    legend_toggle
                                />
                            </div>

                            <br/>

                            {
                                this.state.data && this.state.data.length
                                ? <div className={'my-pretty-chart-container'}>
                                        <Chart
                                            chartType="PieChart"
                                            data={this.state.data}
                                            options={{}}
                                            graph_id="PieChart"
                                            width="100%"
                                            height="400px"
                                            legend_toggle
                                        />
                                    </div>
                                : null
                            }
                        </Tab>

                        <Tab label="Tabla" value={1} icon={<FontIcon className="material-icons">reorder</FontIcon>}>
                            <div>
                                <Table fixedHeader={true} selectable={false} multiselectable={false}>
                                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                                        <TableRow>
                                            <TableHeaderColumn>Actividad Económica</TableHeaderColumn>
                                            <TableHeaderColumn>PBI</TableHeaderColumn>
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
                                        floatingLabelText="Año: "
                                        value={this.state.anio}
                                        onChange={this.handleChangeSelect.bind(this, 'anio')}
                                    >
                                        <MenuItem value={0} primaryText="Seleccionar" />
                                        {this.buildSelectOptions('anios')}
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
