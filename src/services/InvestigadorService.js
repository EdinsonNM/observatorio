const INVESTIGADORES = [
	{'investigador': 'Ambiente y economía', 'cantidad': 20},
	{'investigador': 'Aprovechamiento de residuos sólidos', 'cantidad': 65},
	{'investigador': 'Atmósfera e hidrósfera', 'cantidad': 15},
	{'investigador': 'Biocomercio', 'cantidad': 24},
	{'investigador': 'Biodiversidad acuática', 'cantidad': 22},
	{'investigador': 'Biotecnología y recursos genéticos', 'cantidad': 36},
	{'investigador': 'Calidad ambiental de los ecosistemas acuáticos', 'cantidad': 35},
	{'investigador': 'Conflictividad en torno a los recursos naturales y calidad del ambiente', 'cantidad': 6},
	{'investigador': 'Conservación de la diversidad biológica', 'cantidad': 176},
	{'investigador': 'Control de emisiones', 'cantidad': 31},
	{'investigador': 'Dinámica regional Amazónica', 'cantidad': 11},
	{'investigador': 'Disposición de residuos sólidos', 'cantidad': 39},
	{'investigador': 'Ecología aplicada', 'cantidad': 48},
	{'investigador': 'Ecología de sistemas productivos', 'cantidad': 30},
	{'investigador': 'Energía', 'cantidad': 88},
	{'investigador': 'Evaluación de la calidad del agua', 'cantidad': 116},
	{'investigador': 'Evaluación de la calidad del aire', 'cantidad': 55},
	{'investigador': 'Evaluación de la calidad del suelo', 'cantidad': 1},
	{'investigador': 'Geoespacio', 'cantidad': 9},
	{'investigador': 'Geología Ambiental', 'cantidad': 36},
	{'investigador': 'Gestión del riesgo de desastres', 'cantidad': 74},
	{'investigador': 'Género y ambiente', 'cantidad': 2},
	{'investigador': 'Humedales', 'cantidad': 27},
	{'investigador': 'Interculturalidad y ambiente', 'cantidad': 5},
	{'investigador': 'Investigación en la Antártida', 'cantidad': 5},
	{'investigador': 'Investigación socioeconómica sobre vulnerabilidades asociadas a peligros geofísicos', 'cantidad': 4},
	{'investigador': 'Limnología', 'cantidad': 1},
	{'investigador': 'Manejo de bosques', 'cantidad': 72},
	{'investigador': 'Manejo de territorios comunales amazónicos', 'cantidad': 9},
	{'investigador': 'Minería', 'cantidad': 124},
	{'investigador': 'Mitigación de gases de efecto invernadero', 'cantidad': 54},
	{'investigador': 'Modelos climáticos y escenarios futuros del clima', 'cantidad': 48},
	{'investigador': 'Normatividad y políticas ambientales', 'cantidad': 13},
	{'investigador': 'Oceanografía', 'cantidad': 36},
	{'investigador': 'Química Ambiental', 'cantidad': 38},
	{'investigador': 'Recursos hídricos', 'cantidad': 212},
	{'investigador': 'Reforestación y recuperación de áreas degradadas', 'cantidad': 114},
	{'investigador': 'Retos para la gestión ambiental', 'cantidad': 10},
	{'investigador': 'Sistemas agroforestales', 'cantidad': 45},
	{'investigador': 'Sistemas social-ecológicos', 'cantidad': 4},
	{'investigador': 'Suelos', 'cantidad': 67},
	{'investigador': 'Tecnología e innovación Ambiental', 'cantidad': 37},
	{'investigador': 'Tierra sólida', 'cantidad': 14},
	{'investigador': 'Toxicología y Ecotoxicología', 'cantidad': 26},
	{'investigador': 'Tratamiento de residuos sólidos y peligrosos', 'cantidad': 51},
	{'investigador': 'Uso y tratamiento del agua', 'cantidad': 100},
	{'investigador': 'Uso y tratamiento del suelo', 'cantidad': 8},
	{'investigador': 'Valoración cultural del patrimonio natural', 'cantidad': 3},
	{'investigador': 'Valoración económica del patrimonio natural', 'cantidad': 40},
	{'investigador': 'Vulnerabilidad y adaptación al Cambio Climático', 'cantidad': 190}
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
    return next(null,INVESTIGADORES);
  }

}
