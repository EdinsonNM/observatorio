import ApiService from './ApiService';
import mockData from './idh_data.json';

const serviceName = "/sites/default/files/json/bi/IndicedeDesarrolloHumanoPeru.json";


export default class PBIService extends ApiService{

  constructor(){
    super(serviceName);
  }

  getAll(ubigeo, next){
    let params={};

    return super.getAll2(params, (error, data)=>{
      if(error){
          data = mockData;
      }

      const result = data.data.filter(item => item.ID_UBIGEO == ubigeo);

      return next(null, result);
    });
  }

}
