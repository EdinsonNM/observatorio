import ApiService from './ApiService';
import {to_json} from'xmljson';
import moment from 'moment';

const serviceName = 'wssenamhi/response.php?method=station';

export default class EstacionService extends ApiService {
	constructor(){
		super(serviceName);
	}

	static getAll(provincia, params){
        let data =_.where(DISTRITOS[provincia], params) ;
        return data;
    }

    static get(provincia,id){
        let data = _.findWhere(DISTRITOS[provincia], {id_ubigeo:id});
        return data;
    }
}
