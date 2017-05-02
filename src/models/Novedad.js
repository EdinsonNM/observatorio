import Model from './Model';
import moment from 'moment';

const attrs = [
	"title",
	"cuerpo",
	"elaborado_por",
	"descriptores",
  "fecha_creacion",
	"url_imagen",
	"title_url_novedad",
	"url_novedad"

]

export default class Novedad extends Model{
		constructor(data){
				super();
				this.copy(this.convertToObject(data,attrs),this);
        this.fecha_creacion = moment(this.fecha_creacion);

		}

}
