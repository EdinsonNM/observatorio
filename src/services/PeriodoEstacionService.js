import SenamhiService from './SenamhiService';
import _ from 'underscore';
import Cache from './Cache';

const CACHE_NAME = "PERIODO-ESTATION";
export default class PeriodoEstacionService extends SenamhiService {
	constructor(){
		super();
	}
  getAll(params,next){
    let caching = true;
    if (caching) Cache.clear(CACHE_NAME);
    super.getAll('mesesest',params,(error,data)=>{
      if (caching) Cache.setData(CACHE_NAME, data);
      return next(null,data);
    });
  }

}

