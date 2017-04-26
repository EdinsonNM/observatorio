let SERVICIOS = [
	{"id": "PT||101", "nombre": "Precipitación Total Diaria"},
	{"id": "TM||102", "nombre": "Temperatura Máx Diaria"},
	{"id": "TM||103", "nombre": "Temperatura Mín Diaria"}
];

import _ from 'underscore';
export default class ProvinciaService{
    static getAll(params){
        let data =_.where(params) ;
        return data;
    }
    static get(id){
        let data = _.findWhere({id:id});
        return data;
    }
}
