import ApiService from './ApiService';
const serviceName = '/wsprocuraduria/response.php';
import _ from 'underscore';
import moment from 'moment';
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

  getReport1(data){
      console.log(data);
      let result=[ ['Mes', 'N° de Legajos Ambientales']];
      for(let mes = 0;mes<12;mes++){
        result.push([moment().month(mes).format('MMM'),0])
      }

      data.forEach((item)=>{
        result[parseInt(item.mes)][1]+=parseFloat(item.nr);
      });
      return result;
  }

}
