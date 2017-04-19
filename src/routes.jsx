'use strict';
import React from 'react';
import { render } from 'react-dom';
import { Route,IndexRoute } from 'react-router';
import App from './app';
import Index from './index';
import Login from './components/login/login';
import NotFound from './components/common/notfound';
import RouteUtil from './routeUtil';
import Admin from './components/layouts/admin';
import MainLayout from './components/layouts/main';
import Tematicas from './components/tematicas/tematicas';
import Tematica from './components/tematicas/tematica';
import Servicios from './components/servicios/servicios';
import Servicio from './components/servicios/servicio';
import VisorTematica from './components/visortematicas';
import VisorTematicaHome from './components/visortematicas/home';
import Precipitaciones from './components/visortematicas/ambiental/precipitaciones';
export default (
	
	<Route path="/" component={App} >
		<IndexRoute component={Index}/>
		<Route
			path="/tematica/:tematica"
			component={ VisorTematica }
		>
			<Route
				path="stats"
				component={ VisorTematicaHome }
			/>
			<Route
				path="precipitaciones"
				component={ Precipitaciones }
			/>
		</Route>
		<Route
			path="/login"
			component={ Login }
			onEnter={ RouteUtil.validateAuth }
		/>
	
		<Route
			path="/logout"
			component={ Index }
			onEnter={ RouteUtil.logout }
		/>
		<Route
			path="/login/:token"
			component={ Login }
			onEnter={ RouteUtil.setTokenUrl }
		/>
	
		<Route
			path="/dashboard"
			component={Admin}
			onEnter={RouteUtil.requireAuth}
		>
			<Route
				path="main"
				component={ MainLayout }
			/>
			<Route
				path="tematicas"
				component={ Tematicas }
			/>
			<Route
				path="tematicas/new"
				component={ Tematica }
			/>
			<Route
				path="tematicas/:id/edit"
				component={ Tematica }
			/>

			<Route
				path="servicios"
				component={ Servicios }
			/>
			<Route
				path="servicios/new"
				component={ Servicio }
			/>
			<Route
				path="servicios/:id/edit"
				component={ Servicio }
			/>
			
		</Route>
		<Route path="*" component={NotFound} />
	</Route>
);