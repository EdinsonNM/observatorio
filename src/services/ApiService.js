import api from '../libs/api.js';
import _ from 'underscore';
export default class Model{
	getApi(){
		return api;
	}
	getService(){
		 return api.all(this.modelName);
	}
	getServiceOne(id){
		 return api.one(this.modelName,id);
	}
	constructor(name){
		this.modelName = name||'';
	}

	getAll(params,next,headers={}){
		var service = api.all(this.modelName);
		service.getAll(params,headers).then(
			(response)=>{
				//success
				next(null,response.body().data());
			},
			(error)=>{
				if(error.response)
					return next(error.response.data.data);
				else
					return next('error service')
			}
		);
	}

  getAll2(params,next,headers={}){
    var service = api.all(this.modelName);
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
        try {
				  return next(error.response.data.data);
        } catch (e) {
          return next('Url not found');
        }
			}
		)
  }
	get(id,next){
		var service = api.one(this.modelName, id)
		service.get().then((result)=>{
			next(null,result.body().data())
		},
		(error)=>{
			return next(error.response.data.data);
		});
	}

	save(data,next){
			var service = api.all(this.modelName);
			service.post(data).then((response) => {
				return next(null,response.body().data());
			}, (error) => {
				return next(error.response.data.data);
			});
	}

	update(id,data,next){
			var service = api.one(this.modelName,id);
			service.put(data).then((response) => {
				return next(null,response.body().data());
			}, (error) => {
				return next(error.response.data.data);
			});
	}

	delete(id,next){
		var service = api.one(this.modelName,id);
			service.delete({}).then((response) => {
				return next(null,response.body().data());
			}, (error) => {
				return next(error.response.data.data);
			});
	}
}
