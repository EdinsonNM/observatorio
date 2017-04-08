import Service from './Service';
let DATA_CACHE={}
export default class Cache{
    static getData(name){
        return DATA_CACHE[name];
    }

    static setData(name,data){
        DATA_CACHE[name] = data;
    }

    static getItem(name,id){
        if(DATA_CACHE.hasOwnProperty(name)&&DATA_CACHE[name].hasOwnProperty(id)){
           return DATA_CACHE[name][id];
        }else{
            return [];
        }
    }
    static addItem(name,key,data){
        if(!DATA_CACHE.hasOwnProperty(name)){
            DATA_CACHE[name]={}
        }
        DATA_CACHE[name][key]=data;
    }
    static clear(name){
        DATA_CACHE[name]={};
    }
    static loadCache(route,name,next){
        Service.getAll(route,(error,data)=>{
            if(error) return next(error);
            DATA_CACHE[name] = data;
            return next(null,data);
        },true);
    }

    static isEmpty(name){
        return !DATA_CACHE.hasOwnProperty(name);
    }
    
}