import _ from 'underscore';
export default  class BaseMaps{
  constructor(container){
    this._map={};
    this._container = container;
  }
  create(){
    let self=this;
    let coords = process.env.INITIAL_MAP_LOCATION.split(',');
    this._view =  new ol.View({center: ol.proj.transform([parseFloat(coords[0]), parseFloat(coords[1])], 'EPSG:4326', 'EPSG:3857'),zoom: 9});


    this._map = new ol.Map({
          layers:
              [
              new ol.layer.Group({
				  type:'basemaps',
                  title: 'Mapas Base',
                  layers: [
                      new ol.layer.Tile({
                          title: 'Water color',
                          type: 'base',
                          visible: false,
                          source: new ol.source.Stamen({
                              layer: 'watercolor'
                          })
                      }),
                      new ol.layer.Tile({
                          title: 'OSM',
                          type: 'base',
                          visible: true,
                          source: new ol.source.OSM()
                      }),
                      new ol.layer.Tile({
                          title: 'BingMaps',
                          type: 'base',
                          visible: false,
                           source: new ol.source.BingMaps({
                            imagerySet: 'Aerial',
                            key: 'epeyI2lnXZsP8VlOj5wu~pW2MHRLLmE0qvVGv3D-tvA~AlDhjDeLeqsqxFWATpjiZi4vk4AohioprrIm5afbzanKlPfFbd3V-NZ68sSYh3IZ'
                            })
                      })
                    ]
              })

              ],

              target: self._container,
              view:self._view
         });

        return this._map;
  }
  AddDptoInteractionSelect(next){
    this._map.getView().setZoom(7);
        let dptos = new ol.layer.Group({
            title: 'Distritos',
            layers: [
            new ol.layer.Vector({
                title: 'Distritos',
                type:'custom',
                visible:true,
                source: new ol.source.Vector({
                                    format: new ol.format.GeoJSON(),
                                    projection : 'EPSG:3857',
                                    url: 'visor/data/peru_departamental_simple.geojson'
                })
                })
            ]
        });

        this._map.addLayer(dptos);
         var myStyle = new ol.style.Style ({
          fill: new ol.style.Fill({
             color: 'rgba(0, 131, 143,0.5)'
           }),
            stroke: new ol.style.Stroke({
                color: 'blue',
                width: 1
            })
        });
        var selectedStyle = new ol.style.Style ({
          fill: new ol.style.Fill({
             color: 'rgba(0, 131, 143,0.7)'
           }),
            stroke: new ol.style.Stroke({
                color: 'blue',
                width: 2
            })
        });
        var defaultStyle = new ol.style.Style ({
          fill: new ol.style.Fill({
             color: 'rgba(255,255,255,0)'
           })
        });
        let source = dptos.getLayers().getArray()[0].getSource();
        let filterDptos = process.env.DEPARTAMENTOS_CUENCA.split(',');
        var key = source.on('change', (e)=> {
            if(source.getState()=='ready'){
               ol.Observable.unByKey(key);
                if(process.env.DEPARTAMENTOS_CUENCA!==''&&filterDptos.length>0){
                    source.forEachFeature((feature)=>{
                       feature.setStyle(defaultStyle);

                        let f = _.find(filterDptos ,(num)=>{return num == feature.getProperties().FIRST_IDDP; });
                        if(f){
                            feature.setStyle(myStyle);
                            //feature.style.display = 'visible';

                        }else{

                        }
                    })
                }
            }
        });
      let selectInteraction = new ol.interaction.Select({ condition: ol.events.condition.click });
      selectInteraction.on('select', function(e) {
        if(e.selected.length>0){
          e.selected[0].setStyle(selectedStyle);
          next(null,e.selected[0].getProperties())
        }else{
          return next("no data selected");
        }
        if(e.deselected.length>0){
          if(_.contains(filterDptos,e.deselected[0].getProperties().FIRST_IDDP)){
              e.deselected[0].setStyle(myStyle);

          }else{
              e.deselected[0].setStyle(defaultStyle);
          }
        }
      });
      this._map.addInteraction(selectInteraction);
      return dptos;
  }


  AddDptos(){
        this._map.getView().setZoom(7);
        let dptos = new ol.layer.Group({
            title: 'Departamentos',
            layers: [
            new ol.layer.Vector({
                title: 'Distritos',
                type:'custom',
                visible:true,
                source: new ol.source.Vector({
                                    format: new ol.format.GeoJSON(),
                                    projection : 'EPSG:3857',
                                    url: 'visor/data/peru_departamental_simple.geojson'
                })
                })
            ]
        });

         var myStyle = new ol.style.Style ({
          fill: new ol.style.Fill({
             color: 'rgba(0, 131, 143,0.5)'
           }),
            stroke: new ol.style.Stroke({
                color: 'blue',
                width: 1
            })
        });
        var defaultStyle = new ol.style.Style ({
          fill: new ol.style.Fill({
             color: 'rgba(255,255,255,0)'
           })
        });
        let source = dptos.getLayers().getArray()[0].getSource();
        let filterDptos = process.env.DEPARTAMENTOS_CUENCA.split(',');
        var key = source.on('change', (e)=> {
            if(source.getState()=='ready'){
               ol.Observable.unByKey(key);
                if(process.env.DEPARTAMENTOS_CUENCA!==''&&filterDptos.length>0){
                    source.forEachFeature((feature)=>{
                       feature.setStyle(defaultStyle);

                        let f = _.find(filterDptos ,(num)=>{return num == feature.getProperties().FIRST_IDDP; });
                        if(f){
                            feature.setStyle(myStyle);
                        }else{

                        }
                    })
                }
            }
        });

        this._map.addLayer(dptos);

      return dptos;
  }

    AddLayer(layer){
      this._map.addLayer(layer);
    }

    RemoveLayer(layer){
      this._map.removeLayer(layer);
    }

    GetInfo(next){
       this._map.on('click', (evt) =>{
            let urls=[];
            var layers= this.getLayersSelected();
            if(layers.length>0){
              layers.forEach((layer)=>{
                let wmsSource=layer.ref.getSource();
                let viewResolution =  (this._view.getResolution());
                let url = wmsSource.getGetFeatureInfoUrl(evt.coordinate, viewResolution, 'EPSG:3857',{'INFO_FORMAT': 'text/html'});
                urls.push({title:layer.title,url:url,legend:layer.legend});
              });

            }
            if(urls.length>0){
              next(null,urls);
            }else{
              next("No data");
            }

      });
    }

    getLegends(){
      let urls=[];
      var layers= this.getLayersSelected();
      layers.forEach((layer)=>{
        urls.push({title:layer.title,legend:layer.legend});
      });
      return urls;
    }

    getLayersSelected(){
      let layers=BaseMaps.getLayers(this._map);
      let layersSelected = [];
      layers.forEach((group,indexGroup)=>{
        if(group.type=='services'){
          group.items.forEach((layer,index)=>{
            if(layer.visible){
              layersSelected.push(layer);
            }
          });
        }
      });

      return layersSelected;
    }

     getBaseLayersSelected(){
      let layers=BaseMaps.getLayers(this._map);
      let layersSelected = [];
      layers.forEach((group,indexGroup)=>{
        if(group.type=='basemaps'){
          group.items.forEach((layer,index)=>{
            if(layer.visible){
              layersSelected.push(layer);
            }
          });
        }
      });

      return layersSelected;
    }

    createControlMousePosition(){
              var mousePosition = new ol.control.MousePosition({
                  coordinateFormat: ol.coordinate.createStringXY(2),
                  projection: 'EPSG:32717',
                  target: document.getElementById('myposition'),
                  undefinedHTML: '&nbsp;'
              });
              this._map.addControl(mousePosition);
    }

    getMap(){
      return this._map;
    }

    getBox(){
      return this._box;
    }

    static getLayers(lyr){
      var data=[];
      var lyrs = lyr.getLayers().getArray().slice().reverse();
      for (var i = 0, l; i < lyrs.length; i++) {
          l = lyrs[i];
          if (l.get('title')) {
              data.push(this.getLayer(l, i))

          }
      }
      return data;
  }

  static getLayer(lyr, idx) {

      var data=  {
        title: lyr.get('title'),
		subtitle: lyr.get('subtitle')||'',
        type: lyr.get('type')||'custom',
		expanded: lyr.get('expanded')||false
      }

      if (lyr.getLayers && !lyr.get('combine')) {

          data.group = true;
          data.items = this.getLayers(lyr);
          data.ref=lyr;

      } else {
          data.group = false;
          data.visible = lyr.get('visible');
          data.ref=lyr;
          if(lyr.get('type')!=='base'){
               if (typeof(lyr.getSource().getUrls)=='function'){
                   data.legend =lyr.getSource().getUrls()[0] +'REQUEST=GetLegendGraphic&SERVICE=WMS&VERSION=1.0.0&STYLE=default&TRANSPARENT=true&FORMAT=image/png&layer='+lyr.getSource().getParams().LAYERS;
                    if(lyr.get('legend')){
                      data.legend =lyr.get('legend');
                    }
               }

          }


      }

      return data;

  }

  print(next){
    let self=this;
    this._map.once('postcompose', function(event) {
      var canvas = event.context.canvas;
      try{
        next(null,canvas.toDataURL('image/png'));
      }catch(e){
          next(e);
      }

    });
     self._map.renderSync();

  }
}
