import ApiService from './ApiService';
const serviceName = 'normas/xml';
import {to_json} from'xmljson';
import moment from 'moment';
import Norma from '../models/Norma';

export default class NormaService extends ApiService{

  constructor(){
    super(serviceName);
  }

  getAll (params, next){
	  super.getAll(params, (error, xml) => {
    		if(error) return next(error);
    		to_json(xml, function (err, data) {
      			let items=[]

            for(let key in Object.keys(data.nodes.node)){
        				let item = new Norma(data.nodes.node[key]);
        				items.push(item);
      			}
      			next(error,items)
    		});
	  });
  }
}
