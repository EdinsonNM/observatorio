import ApiService from './ApiService';
import {to_json} from'xmljson';
import moment from 'moment';
import Documento from '../models/Documento';
const serviceName = 'documentos/xml';

export default class DocumentService extends ApiService {
	constructor(){
		super(serviceName);
	}

	getAll(params, next){
		super.getAll(params, (error, xml) => {
			if(error) {
				return next(error);
			}
			to_json(xml, function (err, data) {
				let items=[]
				for(let key in Object.keys(data.nodes.node)){
					let item = new Documento(data.nodes.node[key]);
					items.push(item);
				}
				next(error, items);
			});
		});
	}
}
