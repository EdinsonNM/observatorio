import api from '../libs/api.js';
const SERVICE_NAME = 'wssenamhi/response.php';
export default class SenamhiService {
  getAll(method,params,next){
    params.method = method;
    let headers={};
    var service = api.all(SERVICE_NAME);
		service.getAll(params,headers).then(
			(response)=>{
        let result = [];
        let data = response.body();
        data.forEach((item)=>{
          let obj = item.data();
          result.push(obj);
        });
 				next(null,result);

			},
			(error)=>{
				return next(error.response.data.data);
			}
		)
  }
}
