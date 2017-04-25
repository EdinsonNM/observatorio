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
import {grey400, darkBlack, lightBlack,pink500,teal500,cyan800,cyan100} from 'material-ui/styles/colors';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import {CardHeader} from 'material-ui/Card';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import SelectField from 'material-ui/SelectField';
import Chip from 'material-ui/Chip';

import DepartamentoService from '../../../services/DepartamentoService';
import ProvinciaService from '../../../services/ProvinciaService';
import DistritoService from '../../../services/DistritoService';

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
        this.setState({departamentos});
    }

    handleChangeSelect(key, event, index, value){
        //let state = {...this.state};
        //state[key] = value;

        switch (key) {
            case 'departamento':
                let provincias = ProvinciaService.getAll(this.state.departamento, {});

                this.setState({
                    [key]: value,
                    provincias
                });
                break;
            case 'provincia':
                let distritos = DistritoService.getAll(this.state.provincia,{});

                this.setState({
                    [key]: value,
                    distritos
                });
                break;
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
                        <TableRowColumn>{`${data[idx][0]} mm`} </TableRowColumn>
                        <TableRowColumn>{data[idx][1]}</TableRowColumn>
                        <TableRowColumn>{data[idx+1] ? `${data[idx+1][0]} mm` : ''}</TableRowColumn>
                        <TableRowColumn>{data[idx+1] ? data[idx+1][1] : ''}</TableRowColumn>
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
                    return <MenuItem key={`mi-dep-${idx}`} value={obj.id_ubigeo} primaryText={obj.nombre_ubigeo} />;
                })
                break;
            case "provincias":
                options = this.state.provincias.map((obj, idx) => {
                    return <MenuItem key={`mi-prov-${idx}`} value={obj.id_ubigeo} primaryText={obj.nombre_ubigeo} />;
                });
                break;
            case 'distritos':
                options = this.state.distritos.map((obj, idx) => {
                    return <MenuItem key={`mi-dist-${idx}`} value={obj.id_ubigeo} primaryText={obj.nombre_ubigeo} />;
                });
                break;
        }

        return options;
    }

    render (){
        let {estaciones,variables,anios,meses} = this.state;
        const iconButton = <IconButton href="#/tematica/-KhDkIXgXKSWQpblXLLk/stats">
            <FontIcon className="material-icons" color="#006064">arrow_back</FontIcon>
        </IconButton>;
        let tableRows = this.buildTableRows(this.state.data);

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

                            {
                                (!this.state.showFilter)?
                                <div className="text-filter" style={style.wrapper}>

                                    <Chip style={style.chip}>Departamento</Chip>
                                    <Chip style={style.chip}>Provincia</Chip>
                                    <Chip style={style.chip}>Distrito</Chip>
                                    <Chip style={style.chip}>Diaria</Chip>
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

                        <Tab label="Tabla" value={1} icon={<FontIcon className="material-icons">reorder</FontIcon>}>
                            <div>
                                <Table fixedHeader={true} selectable={false} multiselectable={false}>
                                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                                        <TableRow>
                                            <TableHeaderColumn>Cant.</TableHeaderColumn>
                                            <TableHeaderColumn>Dia</TableHeaderColumn>
                                            <TableHeaderColumn>Cant.</TableHeaderColumn>
                                            <TableHeaderColumn>Dia</TableHeaderColumn>
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
                                        onChange={(event, index, value)=>{this.handleChangeSelect('departamento',event, index, value)}}
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
                                        onChange={(event, index, value)=>{this.handleChangeSelect('provincia',event, index, value)}}
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
                                        onChange={(event, index, value)=>{this.handleChangeSelect('distrito',event, index, value)}}
                                    >
                                        <MenuItem value={0} primaryText="Seleccionar" />
                                        {this.buildSelectOptions('distritos')}
                                    </SelectField>
                                </div>
                                <div className="col-md-4">
                                    <SelectField
                                        fullWidth
                                        floatingLabelText="Estación: "
                                        value={this.state.value}
                                        onChange={this.handleChangeSelect}
                                    >
                                        <MenuItem value={0} primaryText="Seleccionar" />
                                        {
                                            estaciones.map(obj => <MenuItem value={obj.id_ubigeo} primaryText={obj.nombre_ubigeo} />)
                                        }
                                    </SelectField>
                                </div>
                                <div className="col-md-4">
                                    <SelectField
                                        fullWidth
                                        floatingLabelText="Variable: "
                                        value={this.state.value}
                                        onChange={this.handleChangeSelect}
                                    >
                                        <MenuItem value={0} primaryText="Seleccionar" />
                                        {
                                            variables.map(obj => <MenuItem value={obj.id_ubigeo} primaryText={obj.nombre_ubigeo} />)
                                        }
                                    </SelectField>
                                </div>
                                <div className="col-md-4">
                                    <SelectField
                                        fullWidth
                                        floatingLabelText="Año: "
                                        value={this.state.value}
                                        onChange={this.handleChangeSelect}
                                    >
                                        <MenuItem value={0} primaryText="Seleccionar" />
                                        {
                                            anios.map(obj => <MenuItem value={obj.id_ubigeo} primaryText={obj.nombre_ubigeo} />)
                                        }
                                    </SelectField>
                                </div>
                                <div className="col-md-4">
                                    <SelectField
                                        fullWidth
                                        floatingLabelText="Mes"
                                        value={this.state.value}
                                        onChange={this.handleChangeSelect}
                                    >
                                        <MenuItem value={0} primaryText="Seleccionar" />
                                        {
                                            meses.map(obj => <MenuItem value={obj.id_ubigeo} primaryText={obj.nombre_ubigeo} />)
                                        }
                                    </SelectField>
                                </div>
                                <div className="col-md-12">
                                    <RaisedButton label="Cancelar" style={{marginTop:20,marginRight:20}} onTouchTap={this.toggleFilter.bind(this)} />
                                    <RaisedButton label="Filtrar" style={{marginTop:20}} primary={true}/>
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
