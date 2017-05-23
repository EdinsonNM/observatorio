import ApiService from './ApiService';
import _ from 'underscore';
import moment from 'moment';
import {to_json} from'xmljson';
const serviceName = '/wsoefa/oefa.php';

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

  getReport1(data){
      let result=[ ['Mes', 'N° de Denuncias Ambientales']];
      for(let mes = 0;mes<12;mes++){
        result.push([moment().month(mes).format('MMM'),0])
      }

      data.forEach((item)=>{
        let date = item.fechaDenuncia.split('/')
        let month = parseInt(date[1]);
        result[month][1]+=1;
      });
      return result;
  }
  getReport2(data){
    let result = [['Tipo','Total']];
    let agua =  _.filter(data, (item)=> { return parseInt(item.agua) == 1;});
    let suelo = _.filter(data, (item)=> { return parseInt(item.suelo) == 1;});
    let aire = _.filter(data, (item)=> { return parseInt(item.aire) == 1;});
    result.push(['Agua',agua.length]);
    result.push(['Suelo',suelo.length]);
    result.push(['Aire',aire.length]);
    return result;
  }

}
