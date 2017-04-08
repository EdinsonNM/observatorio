import Model from './Model';
const attrs = [
    "title",
    "url",
    "params",
	"serverType"
   
]

export default class Mapa extends Model{
    constructor(data){
        super();
        this.copy(this.convertToObject(data,attrs),this);
        
    }

}