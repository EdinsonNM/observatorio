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
export default class IndexAmbiental extends React.Component{
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
					titleStyle={{
						width: '200px',
						whiteSpace: 'nowrap',
						overflow: 'hidden',
						textOverflow: 'ellipsis'
						}}
					subtitleColor="#FFFFFF"
					title="Temática Ambiental"
					subtitle="Listados de estadísticas"
					avatar={<Avatar icon={<FontIcon  className="fa fa-thermometer-full" color={pink500}></FontIcon>} backgroundColor={teal500}/>}
				/>


				<div className="col-md-12" className="tematica-home-container">
					<div className="feature-box feature-box-style-2">
						<div className="feature-box-icon">
							<i className="fa fa-thermometer-full"></i>
						</div>
						<div className="feature-box-info">
							<h4 className="mb-none">Precipitación y Temperatura</h4>
							<p className="tall">
								Servicio de consulta en línea de datos Metereológicos e Hidrológicos de la Cuenca Chancay-Lambayeque
								<br/>
								<a href="#/tematica/-KhDkIXgXKSWQpblXLLk/precipitaciones">Mostrar gráfica</a>
							</p>
						</div>
					</div>
					<div className="feature-box feature-box-style-2">
						<div className="feature-box-icon">
							<i className="fa fa-search"></i>
						</div>
						<div className="feature-box-info">
							<h4 className="mb-none">Investigadores Ambientales</h4>
							<p className="tall">
								Este servicio proporciona información de los investigadores registrados en El Directorio Nacional de Investigadores e Innovadores DINA.
								<br/>
								<a href="#/tematica/-KhDkIXgXKSWQpblXLLk/investigadores">Mostrar gráfica</a>
							</p>
						</div>
					</div>
					<div className="feature-box feature-box-style-2">
						<div className="feature-box-icon">
							<i className="fa fa-briefcase"></i>
						</div>
						<div className="feature-box-info">
							<h4 className="mb-none">Denuncias Ambientales</h4>
							<p className="tall">
								Este servicio presenta Denuncias Ambientales a través del Servicio Nacional de Denuncias Ambientales - SINADA, unidad especializada del Organismo de Evaluación y Fiscalización Ambiental - OEFA.
								<br/>
								<a href="#/tematica/-KhDkIXgXKSWQpblXLLk/denuncias">Mostrar gráfica</a>
							</p>
						</div>
					</div>
					<div className="feature-box feature-box-style-2">
						<div className="feature-box-icon">
							<i className="fa fa-bookmark"></i>
						</div>
						<div className="feature-box-info">
							<h4 className="mb-none">Legajos Ambientales</h4>
							<p className="tall">
								Servicio de consulta en línea de legajos sobre Delitos Ambientales
								<br/>
								<a href="#/tematica/-KhDkIXgXKSWQpblXLLk/legajos">Mostrar gráfica</a>
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
								<li>Fuentes Contaminantes 2013</li>
								<li>Vertimientos de Agua Residual en la Cuenca</li>
								<li>Botaderos</li>
								<li>Humedales RAMSAR</li>
								<li>Zonas de Amortiguamiento</li>
								<li>Areas Naturales Protegidas</li>
								<li>Estaciones Hidrometeorologicas</li>
							</ul>
							<br/>
						</div>
					</div>

				</div>
			</div>
		);
	}
}
