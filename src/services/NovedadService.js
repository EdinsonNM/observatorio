import ApiService from './ApiService';
const serviceName = 'novedades/xml';
var to_json = require('xmljson').to_json;
export default class NovedadService extends ApiService{
  constructor(){
    super(serviceName);
  }
  getAll(params,next){
	  super.getAll(params,(error,xml)=>{
		  if(error) return next(error);
		  to_json(xml, function (err, data) {
			  return next(err,data);
			});
	  });
  }

}