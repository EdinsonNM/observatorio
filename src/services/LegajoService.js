import ApiService from './ApiService';
const serviceName = '/wsprocuraduria/response.php';
import _ from 'underscore';
export default class LegajoService extends ApiService{

  constructor(){
    super(serviceName);
  }
  getAll(anio,departamento,next){
    let params={
      method:"denuncias",
      anio:anio
    };

    return super.getAll2(params,(error,data)=>{
      if(error){
        //return(error);
        data = LEGAJOS;
      }
      let result = _.filter(data,(item)=>{
        return item.ubigeo&&item.ubigeo.substring(0,2)===departamento;
      });
      return next(null,result);
    });
  }

}
