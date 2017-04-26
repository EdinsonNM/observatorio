import ApiService from './ApiService';
import {to_json} from'xmljson';
import moment from 'moment';

const serviceName = 'wssenamhi/response.php?method=station';

export default class EstacionService extends ApiService {
	constructor(){
		super(serviceName);
	}
}
