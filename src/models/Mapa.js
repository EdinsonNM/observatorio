import Model from './Model';
const attrs = [
    "title",
    "url",
    "layer",
	"serverType",
	"legend"
   
]

export default class Mapa extends Model{
    constructor(data){
        super();
        this.copy(this.convertToObject(data,attrs),this);
        
    }

}