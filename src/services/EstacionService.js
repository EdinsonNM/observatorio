import SenamhiService from './SenamhiService';
import _ from 'underscore';
import Cache from './Cache';

const CACHE_NAME = "ESTATION";
export default class EstacionService extends SenamhiService {
	constructor(){
		super();
	}
  getAll(params,next){
    let caching = true;
    if (caching) Cache.clear(CACHE_NAME);
    return super.getAll('station',params,(error,data)=>{
      if (caching) Cache.setData(CACHE_NAME, data);
      return next(null,data);
    });
  }

  get(id){
    let estaciones = Cache.getData(CACHE_NAME);
    let data = _.findWhere(estaciones, {C_COD_EST:id});
    return data;
  }

  getByDistrito(distrito){
    let data =[];
    let estaciones = Cache.getData(CACHE_NAME);
    data = _.where(estaciones, {C_COD_DIST:distrito});
    return data;
  }

}
