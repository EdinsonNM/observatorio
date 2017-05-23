import Model from './Model';
import moment from 'moment';

const attrs = [
	"title",
	"numero_norma",
  "tipo_norma",
  "cuerpo",
  "representacion_territorial",
  "caratula",
	"elaborado_por",
  "fecha_norma",
  "estado_norma",
  "ambito_norma",
	"descriptores_tematicos",
  "url_documento",
  "title_url_documento",


]

export default class Norma extends Model{

		constructor(data){
				super();
				this.copy(this.convertToObject(data,attrs), this);
        this.fecha_norma = moment(this.fecha_norma);
		}

}
