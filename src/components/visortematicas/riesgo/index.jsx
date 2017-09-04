import React from 'react';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import AppBar from 'material-ui/AppBar';
import {CardHeader} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import {pink500, teal500, blue500} from 'material-ui/styles/colors';

const style={
  appbar:{
    backgroundColor:'var(--paper-cyan-900)'
  }
}
export default class IndexRiesgo extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
			<div className="tematica-home">
				<CardHeader
						textStyle={{paddingRight:0}}
						style={{backgroundColor: '#006064'}}
						titleColor="#FFFFFF"
					
						subtitleColor="#FFFFFF"
						title="Temática de Riesgo y Cambio Climático"
						subtitle="Listados de estadísticas"
						avatar={<Avatar icon={<FontIcon  className="fa fa-thermometer-full" color={pink500}></FontIcon>} backgroundColor={teal500}/>}
						/>

				<br/>
				<div className="col-md-12" style={{flex:'1',overflowY:'auto'}}>
					<div className="feature-box feature-box-style-2">
						<div className="feature-box-info">
							<p className="tall">
								<a href="tematica_cambio_climatico.html"> <span className="fa fa-chevron-left"></span> Regresar</a>
							</p>
						</div>
					</div>
					<div className="feature-box feature-box-style-2">
							<div className="feature-box-icon">
								<i className="fa fa-map-o"></i>
							</div>
							<div className="feature-box-info">
								<h4 className="mb-none">Visor de Mapas</h4>
								<p className="tall"></p>
								<ul>
									<li>Distritos afectados por lluvias intensas, inundaciones, deslizamientos y huaycos 1997-1998</li>
									<li>Escenario de Riesgo en la temporada de lluvias 2015-2016</li>
									<li>Escenario de Riesgo por Bajas temperaturas Julio-Setiembre 2016</li>
									<li>Escenario de Riesgo por Bajas temperaturas Sector Salud 2016</li>
									<li>Estaciones Hidrometeorologicas</li>
									<li>Salinidad</li>
									<li>Drenaje</li>
								</ul>
								<br/>
							</div>
						</div>

				</div>
			</div>
		);
	}
}

