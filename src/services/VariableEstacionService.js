import SenamhiService from './SenamhiService';
import _ from 'underscore';
import Cache from './Cache';
const DATAVARS = [{"C_COD_CLIEN":"10ABF1DD0DF1AA896EE8A2BD571075F5","C_COD_PARAG":"PT","V_NOM_PARAG":"PRECIPITACION","C_COD_CORRP":"101","V_NOM_PARA":"PRECIPITACION TOTAL DIARIA"},{"C_COD_CLIEN":"10ABF1DD0DF1AA896EE8A2BD571075F5","C_COD_PARAG":"TM","V_NOM_PARAG":"TEMPERATURA","C_COD_CORRP":"102","V_NOM_PARA":"TEMPERATURA MAXIMA DIARIA"},{"C_COD_CLIEN":"10ABF1DD0DF1AA896EE8A2BD571075F5","C_COD_PARAG":"TM","V_NOM_PARAG":"TEMPERATURA","C_COD_CORRP":"103","V_NOM_PARA":"TEMPERATURA MINIMA DIARIA"}];
const CACHE_NAME = "PARAM-ESTATION";
export default class VariableEstacionService extends SenamhiService {
	constructor(){
		super();
	}
  getAll(params,next){
    let caching = true;
    if (caching) Cache.clear(CACHE_NAME);
    if (caching) Cache.setData(CACHE_NAME, DATAVARS);
    return next(null,DATAVARS);
    /*super.getAll('param',params,(error,data)=>{
      if (caching) Cache.setData(CACHE_NAME, data);
      return next(null,data);
    });*/
  }

  get(id){
    let estaciones = Cache.getData(CACHE_NAME);
    let data = _.findWhere(estaciones, {C_COD_EST:id});
    return data;
  }


}

