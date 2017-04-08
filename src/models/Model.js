export default class Model{
	convertToObject(data,attrs){
		let obj={};
		for(let i=0;i<attrs.length;i++){
			if(data.hasOwnProperty(attrs[i])){
				obj[attrs[i]]=data[attrs[i]];
			}
		}
		return obj;
	}
	copy(objSource,objTarget){
		debugger;
		for(let key in objSource){
			objTarget[key] = objSource[key];
		}
	}
}