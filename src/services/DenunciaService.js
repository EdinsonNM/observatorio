import ApiService from './ApiService';
const serviceName = 'wsoefa/oefa.php?';
import _ from 'underscore';
export default class DenunciaService extends ApiService{

  constructor(){
    super(serviceName);
  }
  getAll(anio,departamento,next){
    let params={
      key:"MIIDjXCCAvegAwIBAgIBAjANBgkqhkiZ9w0BAQQFADCBijELMAkGA1UEBhMCVVMX",
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
