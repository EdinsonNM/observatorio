const INVESTIGADORES = [
	{'investigador': 'Ambiente y economía', 'cantidad':0},
	{'investigador': 'Aprovechamiento de residuos sólidos', 'cantidad':0},
	{'investigador': 'Atmósfera e hidrósfera', 'cantidad':0},
	{'investigador': 'Biocomercio', 'cantidad':0},
	{'investigador': 'Biodiversidad acuática', 'cantidad':0},
	{'investigador': 'Biotecnología y recursos genéticos', 'cantidad':0},
	{'investigador': 'Calidad ambiental de los ecosistemas acuáticos', 'cantidad':0},
	{'investigador': 'Conflictividad en torno a los recursos naturales y calidad del ambiente', 'cantidad':0},
	{'investigador': 'Conservación de la diversidad biológica', 'cantidad':0},
	{'investigador': 'Control de emisiones', 'cantidad':0},
	{'investigador': 'Dinámica regional Amazónica', 'cantidad':0},
	{'investigador': 'Disposición de residuos sólidos', 'cantidad':0},
	{'investigador': 'Ecología aplicada', 'cantidad':0},
	{'investigador': 'Ecología de sistemas productivos', 'cantidad':0},
	{'investigador': 'Energía', 'cantidad':0},
	{'investigador': 'Evaluación de la calidad del agua', 'cantidad':0},
	{'investigador': 'Evaluación de la calidad del aire', 'cantidad':0},
	{'investigador': 'Evaluación de la calidad del suelo', 'cantidad':0},
	{'investigador': 'Geoespacio', 'cantidad':0},
	{'investigador': 'Geología Ambiental', 'cantidad':0},
	{'investigador': 'Gestión del riesgo de desastres', 'cantidad':0},
	{'investigador': 'Género y ambiente', 'cantidad':0},
	{'investigador': 'Humedales', 'cantidad':0},
	{'investigador': 'Interculturalidad y ambiente', 'cantidad':0},
	{'investigador': 'Investigación en la Antártida', 'cantidad':0},
	{'investigador': 'Investigación socioeconómica sobre vulnerabilidades asociadas a peligros geofísicos', 'cantidad':0},
	{'investigador': 'Limnología', 'cantidad':0},
	{'investigador': 'Manejo de bosques', 'cantidad':0},
	{'investigador': 'Manejo de territorios comunales amazónicos', 'cantidad':0},
	{'investigador': 'Minería', 'cantidad':0},
	{'investigador': 'Mitigación de gases de efecto invernadero', 'cantidad':0},
	{'investigador': 'Modelos climáticos y escenarios futuros del clima', 'cantidad':0},
	{'investigador': 'Normatividad y políticas ambientales', 'cantidad':0},
	{'investigador': 'Oceanografía', 'cantidad':0},
	{'investigador': 'Química Ambiental', 'cantidad':0},
	{'investigador': 'Recursos hídricos', 'cantidad':0},
	{'investigador': 'Reforestación y recuperación de áreas degradadas', 'cantidad':0},
	{'investigador': 'Retos para la gestión ambiental', 'cantidad':0},
	{'investigador': 'Sistemas agroforestales', 'cantidad':0},
	{'investigador': 'Sistemas social-ecológicos', 'cantidad':0},
	{'investigador': 'Suelos', 'cantidad':0},
	{'investigador': 'Tecnología e innovación Ambiental', 'cantidad':0},
	{'investigador': 'Tierra sólida', 'cantidad':0},
	{'investigador': 'Toxicología y Ecotoxicología', 'cantidad':0},
	{'investigador': 'Tratamiento de residuos sólidos y peligrosos', 'cantidad':0},
	{'investigador': 'Uso y tratamiento del agua', 'cantidad':0},
	{'investigador': 'Uso y tratamiento del suelo', 'cantidad':0},
	{'investigador': 'Valoración cultural del patrimonio natural', 'cantidad':0},
	{'investigador': 'Valoración económica del patrimonio natural', 'cantidad':0},
	{'investigador': 'Vulnerabilidad y adaptación al Cambio Climático', 'cantidad':0}
];

/*
import _ from 'underscore';
export default class InvestigadorService{

    static getAll(params){
        let data =_.where(INVESTIGADORES, params) ;
        return data;
    }

}
*/
import ApiService from './ApiService';
const serviceName = 'sites/default/files/json/dina/investigadores-dina.json';
import moment from 'moment';

export default class InvestigadorService extends ApiService{

  constructor(){
    super(serviceName);
  }
  getAll(params,next){
    return super.getAll2(params,(error,data)=>{
      INVESTIGADORES.forEach((item)=>{

        data.forEach((inv) =>{
          let  ind = inv.lstTematicaAmbiental.toLowerCase().search(item.investigador.toLowerCase());
          if(ind>=0){
            item.cantidad++;
          }
        });
      });


      return next(null,INVESTIGADORES);
    });
  }

}
