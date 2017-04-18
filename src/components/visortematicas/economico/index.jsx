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
export default class IndexEconomico extends React.Component{
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
						titleStyle={{
							width: '200px',
							whiteSpace: 'nowrap',
							overflow: 'hidden',
							textOverflow: 'ellipsis'
							}}
						subtitleColor="#FFFFFF"
						title="Temática Social-Económica"
						subtitle="Listados de estadísticas"
						avatar={<Avatar icon={<FontIcon  className="fa fa-thermometer-full" color={pink500}></FontIcon>} backgroundColor={teal500}/>}
						/>

	
				<div className="col-md-12" style={{flex:'1',overflowY:'auto'}}>
					<div className="feature-box feature-box-style-2">
							<div className="feature-box-icon">
								<i className="fa fa-usd"></i>
							</div>
							<div className="feature-box-info">
								<h4 className="mb-none">Gasto Público</h4>
								<p className="tall">
									El presupuesto es la expresión cuantificada, conjunta y sistemática de los gastos programados durante el año fiscal, por cada una de las entidades del sector público, la cual refleja los ingresos que financian dichos gastos. Así, constituye el instrumento de gestión del Estado que permite a las entidades lograr sus objetivos y metas contenidas en sus respectivos Planes Operativos Institucionales (POI)
									<br/>
									<a href="visor.htm">Mostrar gráfica</a>
								</p>
							</div>
						</div>
						<div className="feature-box feature-box-style-2">
							<div className="feature-box-icon">
								<i className="fa fa-money"></i>
							</div>
							<div className="feature-box-info">
								<h4 className="mb-none">PBI por Actividades Económicas</h4>
								<p className="tall">
									Procesos que tienen lugar para la obtención de productos, bienes y/o servicios destinados a cubrir necesidades y deseos en la sociedad, que contribuirán al progreso económico. Tienen como propósito cubrir las necesidades humanas a partir del trabajo haciendo uso de los recursos disponibles, contemplando un criterio no sólo económico y empresarial, sino también social y ambiental en la toma de decisiones.
									<br/>
									<a href="visor.htm">Mostrar gráfica</a>
								</p>
							</div>
						</div>
						<div className="feature-box feature-box-style-2">
							<div className="feature-box-icon">
								<i className="fa fa-info-circle"></i>
							</div>
							<div className="feature-box-info">
								<h4 className="mb-none">Índice de Desarrollo Humano</h4>
								<p className="tall">
									El PNUD viene trabajando en ámbitos tan variados como los derechos humanos, la generación de ingresos, el fomento de la actividad productiva de los sectores excluidos, la tecnología de información, la sostenibilidad ambiental, el potencial energético, la atención de emergencias climáticas y sociales, entre los principales.
									<br/>
									<a href="visor.htm">Mostrar gráfica</a>
								</p>
							</div>
						</div>
						<div className="feature-box feature-box-style-2">
							<div className="feature-box-icon">
								<i className="fa fa-map-o"></i>
							</div>
							<div className="feature-box-info">
								<h4 className="mb-none">Visor de Mapas Social-Económico</h4>
								<p className="tall"></p>
								<ul>
									<li>Catastro Minero - INGEMMET</li>
									<li>Uso Actual de la Tierra (Uso del Suelo)</li>
									<li>Areas Naturales Protegidas</li>
									<li>Zonas de Amortiguamiento</li>
									<li>Red Vial</li>
									<li>Pasivos Ambientales Mineros</li>
									<li>Sitios Arqueológicos</li>
									<li>Área Agrícola</li>
									<li>Establecimientos de Salud</li>
									<li>Población</li>
									<li>Comunidades Campesinas</li>
								</ul>
								<br/>
							</div>
						</div>

				</div>
			</div>
		);
	}
}

