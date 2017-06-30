const serviceName = 'sites/default/files/json/bi/GastoAmbientalDistritalCajamarcaLambayequeArequipaPiura.json';
import ApiService from './ApiService';

let MUNICIPALIDADES = [];

export default class MunicipalidadService extends ApiService{

    constructor(){
        super(serviceName);
    }

    getAll(params, next){
        let service =  this.getApi().all(serviceName);
        let filter = process.env.DEPARTAMENTOS_CUENCA || '';
        
        service.getAll(params, {}).then(
            response => {
                if (filter !== '') {
                    let idMunis = filter.split(',');
                    let municipalidades = response.body().data().data;
                    let munisFiltradas = municipalidades.filter(obj => {
                        let idUbigeo = obj.ID_UBIGEO.substr(0, 2);
                        
                        return idUbigeo == idMunis[0] || idUbigeo == idMunis[1];
                    });
                    
                    MUNICIPALIDADES = munisFiltradas;
                    next(munisFiltradas);
                }else{                
                    MUNICIPALIDADES = municipalidades;
                    next(municipalidades);
                }
            },
            error => next(error.response.data.data)
		);
    }

    static get(id){
    }

    static getByYear (year) {
        debugger;
        return MUNICIPALIDADES.filter(obj => obj.ANIO == year);
    }

    static getAllGastos (year) {
        debugger;
        return MUNICIPALIDADES.filter(obj => obj.ANIO == year);
    }

    static getGastos (year, muni) {
        return MUNICIPALIDADES.filter(obj => obj.MUNICIPALIDAD == muni && obj.ANIO == year);
    }

}
