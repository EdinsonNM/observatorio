import ApiService from './ApiService';
const serviceName = 'novedades/xml';
import {to_json} from'xmljson';
import moment from 'moment';
export default class NovedadService extends ApiService{
  constructor(){
    super(serviceName);
  }
  getAll(params,next){
	  /*return next(null,{nodes:{node:{
		  '0':	{
			title:'MINAM y SNI organizan curso de formación en cálculo y reporte de emisiones',
			description:'de promover la participación de las industrias en el proceso de implementación del Registro de Emisiones y Transferencia de Contaminantes (RETC), el Ministerio del Ambiente (MINAM) con apoyo de la Sociedad Nacional de Industrias (SNI), invitan a participar del Curso de Formación en Cálculo y Re',
			elaborado_por:'Ministerio del Ambiente - MINAM',
			descriptores:'emisiones de fuentes fijas',
			fecha_creacion:'2017-04-06',
			url_imagen:'http://sinia.minam.gob.pe/sites/default/files/archivos/public/docs/flyer-iloveimg-resized.png',
			url_novedad: 'http://sinia.minam.gob.pe/novedades/minam-sni-organizan-curso-formacion-calculo-reporte-emisiones'
		},
		'1':	{
			title:'MINAM y SNI organizan curso de formación en cálculo y reporte de emisiones',
			description:'de promover la participación de las industrias en el proceso de implementación del Registro de Emisiones y Transferencia de Contaminantes (RETC), el Ministerio del Ambiente (MINAM) con apoyo de la Sociedad Nacional de Industrias (SNI), invitan a participar del Curso de Formación en Cálculo y Re',
			elaborado_por:'Ministerio del Ambiente - MINAM',
			descriptores:'emisiones de fuentes fijas',
			fecha_creacion:'2017-04-06',
			url_imagen:'http://sinia.minam.gob.pe/sites/default/files/archivos/public/docs/flyer-iloveimg-resized.png',
			url_novedad: 'http://sinia.minam.gob.pe/novedades/minam-sni-organizan-curso-formacion-calculo-reporte-emisiones'
		},
		'2':	{
			title:'MINAM y SNI organizan curso de formación en cálculo y reporte de emisiones',
			description:'de promover la participación de las industrias en el proceso de implementación del Registro de Emisiones y Transferencia de Contaminantes (RETC), el Ministerio del Ambiente (MINAM) con apoyo de la Sociedad Nacional de Industrias (SNI), invitan a participar del Curso de Formación en Cálculo y Re',
			elaborado_por:'Ministerio del Ambiente - MINAM',
			descriptores:'emisiones de fuentes fijas',
			fecha_creacion:'2017-04-06',
			url_imagen:'http://sinia.minam.gob.pe/sites/default/files/archivos/public/docs/flyer-iloveimg-resized.png',
			url_novedad: 'http://sinia.minam.gob.pe/novedades/minam-sni-organizan-curso-formacion-calculo-reporte-emisiones'
		},
		'3':	{
			title:'MINAM y SNI organizan curso de formación en cálculo y reporte de emisiones',
			description:'de promover la participación de las industrias en el proceso de implementación del Registro de Emisiones y Transferencia de Contaminantes (RETC), el Ministerio del Ambiente (MINAM) con apoyo de la Sociedad Nacional de Industrias (SNI), invitan a participar del Curso de Formación en Cálculo y Re',
			elaborado_por:'Ministerio del Ambiente - MINAM',
			descriptores:'emisiones de fuentes fijas',
			fecha_creacion:'2017-04-06',
			url_imagen:'http://sinia.minam.gob.pe/sites/default/files/archivos/public/docs/flyer-iloveimg-resized.png',
			url_novedad: 'http://sinia.minam.gob.pe/novedades/minam-sni-organizan-curso-formacion-calculo-reporte-emisiones'
		}
	}}})*/
	  super.getAll(params,(error,xml)=>{
		if(error) return next(error);
		to_json(xml, function (err, data) {
			let items=[]
			for(let key in Object.keys(data.nodes.node)){
				let item = data.nodes.node[key];
				item.fecha_creacion = moment(item.fecha_creacion);
				item.day = item.fecha_creacion.date()
				item.month = item.fecha_creacion.month();
				items.push(item);
			}
			next(error,items)
		});
	  });
  }

}