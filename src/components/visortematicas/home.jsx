import React from 'react';
import HomeAmbiental from './ambiental'
import HomeSocialEconomico from './economico'
import HomeRiesgo from './riesgo'
import HomeHidrologico from './hidrologico'

export default class HomeApp extends React.Component{
	constructor(props){
		super(props);
	}
	getHome(){
		let home = null;
		switch(this.props.params.tematica){
			case '-KhDkIXgXKSWQpblXLLk'://ambiental
				home = <HomeAmbiental/>;
				break;
			case '-KhDogAt_wkHk731PHh1'://economico
				home = <HomeSocialEconomico/>;
				break;
			case '-KhDn_2T4FBIYt1XF4Zi':
				home = <HomeRiesgo/>;
				break;
			case '-KhDpV9TzDZKK9qRA1vY':
				home = <HomeHidrologico/>;
				break;
		}
		return home;
	}
	render(){
		let homeCmp = this.getHome();
		return(homeCmp);
	}
}