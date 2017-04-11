//aqui la lógica para el archivo index.html
import NovedadService from './services/NovedadService';
let service = new NovedadService();
/*
service.getAll({
	draw:1,
	start:0,
	length:10
},(error,data)=>{
	console.log(data);
});
*/


/*
let templateNoticia = document.querySelector("#noticias-template").innerHTML;

for (var index = 0; index < array.length; index++) {
	let template = create(templateNoticia,{});
	document.querySelector("#noticias").appendChild(template)
	
}

*/