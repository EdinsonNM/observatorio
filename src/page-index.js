//aqui la lógica para el archivo index.html
import NovedadService from './services/NovedadService';
let service = new NovedadService();

service.getAll({
	draw:1,
	start:0,
	length:10
},(error,data)=>{
	console.log(data);
});

