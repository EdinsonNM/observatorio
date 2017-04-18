import ApiService from './ApiService';
import {to_json} from'xmljson';
import moment from 'moment';

const serviceName = 'novedades/xml';

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
					let item = data.nodes.node[key];
					item.fecha_creacion = moment(item.fecha_creacion);
					item.day = item.fecha_creacion.date()
					item.month = item.fecha_creacion.month();
					items.push(item);
				}
				next(error, items);
			});
		});
	}
}
