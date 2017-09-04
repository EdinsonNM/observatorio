const serviceName = 'sites/default/files/json/bi/GastoAmbientalDistritalCajamarcaLambayequeArequipaPiura.json';
import ApiService from './ApiService';

let MUNICIPALIDADES = [];

export default class MunicipalidadService extends ApiService{

    constructor(){
        super(serviceName);
    }

    getAll(dpto, next){
        let service =  this.getApi().all(serviceName);

        service.getAll({}, {}).then(
            response => {
                    let municipalidades = response.body().data().data;
                    let munisFiltradas = municipalidades.filter(obj => {
                        let idUbigeo = obj.ID_UBIGEO.substr(0, 2);

                        return idUbigeo == dpto;
                    });

                    MUNICIPALIDADES = munisFiltradas;
                    next(munisFiltradas);

            },
            error => next(error.response.data.data)
		);
    }

    static get(id){
    }

    static getByYear (year) {
        return MUNICIPALIDADES.filter(obj => obj.ANIO == year);
    }

    static getAllGastos (year) {
        return MUNICIPALIDADES.filter(obj => obj.ANIO == year);
    }

    static getGastos (year, muni) {
        return MUNICIPALIDADES.filter(obj => obj.MUNICIPALIDAD == muni && obj.ANIO == year);
    }

}
