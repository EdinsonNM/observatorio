import SenamhiService from './SenamhiService';
import _ from 'underscore';
import Cache from './Cache';
import ajax from 'basic-ajax';

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

  getEstacionesFromWebService(next){
    let dataXML = `
    <?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <listarPuntos xmlns="http://tempuri.org/">
          <idCuenca>${process.env.IDCUENCA_WEBSERVICE}</idCuenca>
        </listarPuntos>
      </soap:Body>
    </soap:Envelope>
    `
    ajax.post('http://snirh.ana.gob.pe/wsParaAgua/webService.asmx?wsdl', {"Content-Type": "application/xml"}, dataXML).then((data) => {
      next(null,data);
      console.log(data);
    })
    .catch(() => {
      return next(null,[
    {
        "id": 24,
        "nom": "CAÑAD",
        "tip": "H",
        "lon": -79.07361,
        "lat": -6.65583,
        "aut": 1,
        "fmin": "31/12/2016 22:00",
        "fmax": "20/06/2017 21:00"
    },
    {
        "id": 25,
        "nom": "PUENTE SAN CARLOS",
        "tip": "H",
        "lon": -79.27111,
        "lat": -6.61528,
        "aut": 1,
        "fmin": "01/03/2017 06:00",
        "fmax": "20/06/2017 21:00"
    },
    {
        "id": 26,
        "nom": "PUENTE AMBAN",
        "tip": "H",
        "lon": -78.9125,
        "lat": -6.58278,
        "aut": 1,
        "fmin": "31/12/2016 22:00",
        "fmax": "20/06/2017 21:00"
    },
    {
        "id": 28,
        "nom": "TONGOD",
        "tip": "H",
        "lon": -78.81361,
        "lat": -6.74444,
        "aut": 1,
        "fmin": "31/12/2016 22:00",
        "fmax": "20/06/2017 21:00"
    },
    {
        "id": 1727,
        "nom": "RACARUMI",
        "tip": "H",
        "lon": -79.31667,
        "lat": -6.63333,
        "aut": 0,
        "fmin": "01/01/1914 00:00",
        "fmax": "19/06/2017 00:00"
    },
    {
        "id": 2293,
        "nom": "Tinajones",
        "tip": "E",
        "lon": -79.44,
        "lat": -6.65,
        "aut": 0,
        "fmin": "01/01/2015 06:00",
        "fmax": "20/06/2017 06:00"
    }
])
    });
  }

  getDataFromWebService(){

  }

}
