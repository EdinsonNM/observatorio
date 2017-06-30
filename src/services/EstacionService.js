import SenamhiService from './SenamhiService';
import _ from 'underscore';
import Cache from './Cache';
import {to_json} from'xmljson';

const CACHE_NAME = "ESTATION";
export default class EstacionService extends SenamhiService {
	constructor(){
		super();
	}
  getAll(params,next){
    let caching = true;
    if (caching) Cache.clear(CACHE_NAME);
    return super.getAll('station',params,(error,data)=>{
      if (caching) Cache.setData(CACHE_NAME, data);
      return next(null,data);
    });
  }

  get(id){
    let estaciones = Cache.getData(CACHE_NAME);
    let data = _.findWhere(estaciones, {C_COD_EST:id});
    return data;
  }

  getByDistrito(distrito){
    let data =[];
    let estaciones = Cache.getData(CACHE_NAME);
    data = _.where(estaciones, {C_COD_DIST:distrito});
    return data;
  }

  soap(url, request,next) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open('POST', url, true);

            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                      return next(null,xmlhttp.response);
                      //  alert('done. use firebug/console to see network response');
                    }
                }
            }
            xmlhttp.setRequestHeader('Content-Type', 'text/xml');
            xmlhttp.send(request);

        }

  getEstacionesFromWebService(next){
    let dataXML = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <listarPuntos xmlns="http://tempuri.org/">
          <idCuenca>${process.env.IDCUENCA_WEBSERVICE}</idCuenca>
        </listarPuntos>
      </soap:Body>
    </soap:Envelope>
    `
    this.soap('http://snirh.ana.gob.pe/wsParaAgua/webService.asmx?wsdl',dataXML,(error, xml)=>{
      to_json(xml, function (err, data) {
        let dataStr = data['soap:Envelope']['soap:Body'].listarPuntosResponse.listarPuntosResult;
        const dataResult = JSON.parse(dataStr);
        return next(null,dataResult)
      });
    })
    
  }

  getDataFromWebService(idEstacion, fIni, fFin, next){
    let dataXML = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <listarDatos xmlns="http://tempuri.org/">
          <idPunto>${idEstacion}</idPunto>
          <desde>${fIni}</desde>
          <hasta>${fFin}</hasta>
        </listarDatos>
      </soap:Body>
    </soap:Envelope>
    `
    this.soap('http://snirh.ana.gob.pe/wsParaAgua/webService.asmx?wsdl',dataXML,(error, xml)=>{
      to_json(xml, function (err, data) {
        let dataStr = data['soap:Envelope']['soap:Body'].listarDatosResponse.listarDatosResult;
        const dataResult = JSON.parse(dataStr);
        return next(null,dataResult)
      });
    })
  }

  static getVariables(){
    const data = [
      {id: 'niv_hor', title: 'Nivel Instantaneo', description: 'medida de nivel del rio en un determinado instante de tiempo', um: 'metros'},
      {id: 'vol_ins', title: 'Volumen instantáneo', description: 'medida del volumen de un embalse en un determinado instante de tiempo', um: 'Hectómetros cúbicos'},
      {id: 'Cau_ins', title: 'Caudal instantaneo del día', description: 'Caudal instantaneo del día', um: 'Metros cúbicos por segundo'},
      {id: 'Cau_pro', title: 'Caudal promedio del día', description: 'Caudal promedio del día', um: 'Metros cúbicos por segundo'},
    ]
    return data;
  }

}
