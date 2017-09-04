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
import moment from 'moment';

import InvestigadorService from '../../../services/InvestigadorService';
import BarChart from '../BarChart';

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


export default class Investigadores extends React.Component{
    constructor(props){
        super(props);
        this.state={
            title: 'Investigadores Ambientales',
            tabIndex: 0,
            investigadores: []
        };

        this.handleChangeTab = this.handleChangeTab.bind(this);
    }

    componentDidMount() {
        let investigadoresService = new InvestigadorService();
        investigadoresService.getAll({},(error,investigadores)=>{
            this.setState({
                investigadores:investigadores
            });

        });

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

    buildDataForExport(data) {
        let content = 'Especialidad, Cantidad\n';
        let dataString = '';

        for (let idx = 0; idx < data.length; idx++) {
            dataString = `${data[idx]['investigador']}, ${data[idx]['cantidad']}`;
            content += idx < data.length ? dataString + '\n' : dataString;
        }

        return content;
    }

    export() {
        var dataType = 'data:text/csv;charset=utf-8,%EF%BB%BF';
        var csvContent = this.buildDataForExport(this.state.investigadores);

        var a = document.createElement('a');
        a.href = dataType + encodeURI(csvContent);
        a.download = 'tabla_investigadores_' + moment().format("YYYY-MM-DD-HH-mm-ss").replace(/-/g, '') + '.csv';
        a.click();
    }

    render (){
        let {estaciones,variables,anios,meses} = this.state;
        const iconButton = <IconButton href="#/tematica/-KhDkIXgXKSWQpblXLLk/stats">
            <FontIcon className="material-icons" color="#006064">arrow_back</FontIcon>
        </IconButton>;
        const iconButtonExport = <IconButton onClick={this.export.bind(this)}>
            <FontIcon className="material-icons" color="#006064">file_download</FontIcon>
        </IconButton>;

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
                    <BarChart data={this.state.investigadores} />
                </div>
            </div>
        );
    }
}
