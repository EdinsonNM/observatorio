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
			<div style={{display:'flex',height:'100%','flexDirection':'column'}}>
				<CardHeader
						textStyle={{paddingRight:0}}
						style={{backgroundColor: '#006064'}}
						titleColor="#FFFFFF"
					
						subtitleColor="#FFFFFF"
						title="Temática Hidrológica"
						subtitle="Listados de estadísticas"
						avatar={<Avatar icon={<FontIcon  className="fa fa-thermometer-full" color={pink500}></FontIcon>} backgroundColor={teal500}/>}
						/>

	
				<div className="col-md-12" style={{flex:'1',overflowY:'auto'}}>
					<div className="feature-box feature-box-style-2">
							<div className="feature-box-icon">
								<i className="fa fa-map-o"></i>
							</div>
							<div className="feature-box-info">
								<h4 className="mb-none">Visor de Mapas</h4>
								<p className="tall"></p>
								<ul>
									<li>Canales Principales</li>
									<li>Canales de Riego</li>
									<li>Sectores y Subsectores de Riego</li>
									<li>Red Drenaje</li>
									<li>Vertimientos Autorizados(puntos)</li>
									<li>Autoridad Administrativa del Agua</li>
									<li>Administración Local del Agua</li>
									<li>Unidades Hidrográficas</li>
								</ul>
								<br/>
							</div>
						</div>

				</div>
			</div>
		);
	}
}

