import React from 'react';
import { render } from 'react-dom';
import { Chart } from 'react-google-charts';


import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import {pink500, teal500, blue500} from 'material-ui/styles/colors';
import {CardHeader} from 'material-ui/Card';



const style={
  appbar:{
    backgroundColor:'var(--paper-cyan-900)'
  }
}
export default class Precipitaciones extends React.Component{
	constructor(props){
		super(props);
		this.state={
			data:[['unidad', 'Por Dia'],
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
		}
	}
	render(){
		return(
			<div>
					<AppBar
						title="Temática Ambiental"
						iconElementLeft={<IconButton href="#/tematica/-KhDkIXgXKSWQpblXLLk/stats"><FontIcon  className="material-icons" >arrow_back</FontIcon></IconButton>}
						style={style.appbar}
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
						title="Precipitación y Temperatura"
						subtitle="Precipitación Total diaria, Temperatura Máxima, Temperatura Mínima"
						avatar={<Avatar icon={<FontIcon  className="fa fa-thermometer-full" color={pink500}></FontIcon>} backgroundColor={teal500}/>}
						/>

				<div className="col-md-12">

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
				</div>
			</div>
		);
	}
}