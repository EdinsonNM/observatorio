import ApiService from './ApiService';
import _ from 'underscore';

const serviceName = '/sites/default/files/json/bi/GastoAmbientalDistritalCajamarcaLambayeque.json';

export default class GastoService extends ApiService{

  constructor(){
    super(serviceName);
  }

  getAll(anio, departamento, next){
    let params={};

    return super.getAll2(params, (error, data)=>{
      if(error){
        data = mockData;
      }
      let result = _.filter(data.data, (item) => {
        return (item.IdUbigeo && item.IdUbigeo.substring(0,2) === departamento) && (item.IDAnio == anio) ;
      });

      return next(null,result);
    });
  }

}
