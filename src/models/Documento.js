import Model from './Model';
import moment from 'moment';

const attrs = [
	"title",
	"tipo_documento",
	"cuerpo",
	"representacion_territorial",
	"caratula",
	"contacto",
	"email",
	"descriptores_tematicos",
	"elaborado_por",
	"title_url_documento",
	"url_documento",
	"fecha_creacion"

]

export default class Documento extends Model{
		constructor(data){
				super();
				this.copy(this.convertToObject(data,attrs),this);
        this.fecha_creacion = moment(this.fecha_creacion);

		}

}
