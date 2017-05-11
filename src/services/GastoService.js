import ApiService from './ApiService';
import _ from 'underscore';

const serviceName = '/sites/default/files/json/bi/PBIxActividadesEconomicasxDepartamentos.json';

export default class PBIService extends ApiService{

  constructor(){
    super(serviceName);
  }

  getAll(anio, departamento, next){
    let params={};

    return super.getAll2(params, (error, data)=>{
      if(error){
        data = mockData;
      }
      let result = _.filter(data.data, (item) => {
        return (item.IdUbigeo && item.IdUbigeo.substring(0,2) === departamento) && (item.IDAnio == anio) ;
      });

      return next(null,result);
    });
  }

  transformData (data) {
      let results = {
        "MonTelecomunicacionyOtrosServdeInformacion": 0,
        "MonAlojamientoyRestaurantes": 0,
        "MonExtraccionPetroleoGasyMinerales": 0,
        "MonAgricultura": 0,
        "MonElectricidadGasyAgua": 0,
        "MonManufactura": 0,
        "MonTransporteAlmacenamientoCorreoyMensajeria": 0,
        "MonPescayAcuicultura": 0,
        "MonOtrosServicios": 0,
        "MonComercio": 0,
        "MonAdministracionPublica": 0,
        "MonConstruccion": 0
      };

      data.forEach(obj => {
        for(let key in results){
          results[key] += (obj[key]*1);
        }
      });

      let resultRpt = [['nombre','valor']];

      for(let key in results){
        resultRpt.push([key, results[key]]);
      }

      return resultRpt;
  }

}
