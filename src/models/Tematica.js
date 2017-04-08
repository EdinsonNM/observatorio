import Model from './Model';
const attrs = [
    "titulo",
    "nombre",
    "descripcion",
	"detalles"
   
]

export default class Tematica extends Model{
    constructor(data){
        super();
        this.copy(this.convertToObject(data,attrs),this);
        
    }

}