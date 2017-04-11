import api from '../libs/api.js'

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

	getAll(params,next){
		var service = api.all(this.modelName);
		service.getAll(params,{'Content-Type':'application/json'}).then(
			(response)=>{
				//success
				next(null,response.body().data());
			},
			(error)=>{
				return next(error.response.data.data);
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