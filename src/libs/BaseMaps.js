export default  class BaseMaps{
  constructor(container){
    this._map={};
    this._container = container;
  }
  create(){
    let self=this;
    this._view =  new ol.View({center: ol.proj.transform([-79.28, -6.62], 'EPSG:4326', 'EPSG:3857'),zoom: 9});
    this._map = new ol.Map({
          layers:
              [
              new ol.layer.Group({
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
                      }),
                      
                    ]
              }),
              new ol.layer.Group({
                title: 'Mapa Cuenca',
                  layers: [
                    new ol.layer.Vector({
                        title: 'Cuenca Chancay Lambayeque',
                        type:'custom',
                        visible:true,
                        source: new ol.source.Vector({
							format: new ol.format.GeoJSON(),
                          projection : 'EPSG:3857',
                         url: 'data/chancay_lambayeque_geojson.geojson'
                        })
                      })
                  ]
              })
              ],

              target: self._container,
              view:self._view
         });  
        return this._map
  }

    AddLayer(layer){
      this._map.addLayer(layer);
    }

    RemoveLayer(layer){
      this._map.removeLayer(layer);
    }

    GetInfo(next){
        let self=this;
       this._map.on('click', function(evt) {
            var layers=BaseMaps.getLayers(self._map);
            var layer = self.getLayerSelected()
            if(layer){
              var wmsSource=layer.getSource();

              var viewResolution =  (self._view.getResolution());
              var url = wmsSource.getGetFeatureInfoUrl(
                  evt.coordinate, viewResolution, 'EPSG:3857',
                  {'INFO_FORMAT': 'text/html'});
              if (url) {
                  next(null,url)
              }else{
                    next("no data");
              } 
            }
           
          
      });
    }


    getLayerSelected(){
      let self=this;
      let layerSelected=null;
      let layers=BaseMaps.getLayers(self._map);
      console.log(layers[0].items);
      layers[0].items.forEach((layer)=>{
          if(layer.visible){
            
              layerSelected=layer.ref;
          }
      });
      return layerSelected;
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
        type: lyr.get('type')||'custom'
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