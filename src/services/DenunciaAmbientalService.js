import ApiService from './ApiService';
const serviceName = '/wsoefa/oefa.php';
import _ from 'underscore';
import {to_json} from'xmljson';

export default class DenunciaAmbientalService extends ApiService{

  constructor(){
    super(serviceName);
  }
  getAll(anio,departamento,next){
    let params={
      key:"MIIDjXCCAvegAwIBAgIBAjANBgkqhkiZ9w0BAQQFADCBijELMAkGA1UEBhMCVVMX",
      anio:anio
    };

    super.getAll(params, (error, xml) => {
    		if(error) return next(error);
    		to_json(xml, function (err, data) {
      			let items=[]
            console.log(data);
            for(let key in Object.keys(data.denuncias.denuncia)){
        				let item = data.denuncias.denuncia[key];
        				items.push(item);
      			}
            let result = _.filter(items,(item)=>{
              return item.dptoHecho===departamento;
            });
      			return next(error,result);
    		});
	  });
  }

}
