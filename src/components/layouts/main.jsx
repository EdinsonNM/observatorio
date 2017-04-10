import React from 'react';
import ReactDOM from 'react-dom';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import Subheader from 'material-ui/Subheader';

import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

const style={
  appbar:{
    backgroundColor:'var(--paper-purple-700)'
  }
}

import Sidebar from './sidebar';
export default class Admin extends React.Component {
  constructor () {
    super();
    this.state={
      open:false,
      rowHeight:200
    };
  }

  onBreakpointChange(newBreakpoint, newCols) {
      console.log('onBreakpointChange',newBreakpoint, newCols);
  }
  onLayoutChange(currentLayout, allLayouts) {
    //console.log('onLayoutChange',currentLayout,allLayouts);
  }
  onWidthChange(containerWidth, margin , cols, containerPadding){
    //console.log('onWidthChange',containerWidth, margin , cols, containerPadding)

    
  }
  componentDidMount(){
    setTimeout(()=>{
      let card = document.querySelector('.card');
      let height = parseInt(window.getComputedStyle(card).height)+10;
      this.setState({rowHeight:height});
      console.log(height)
    },1000);
    
    window.addEventListener('resize',(e)=>{
      let card = document.querySelector('.card');
      if(card){
        let height = parseInt(window.getComputedStyle(card).height)+10;
        console.log(height)
        this.setState({rowHeight:height});
      }
     
    })
  }

    componentWillUnmount(){
      window.removeEventListener("resize", null);
    }

  render(){
     var layouts = {
       lg:[
          {i: '1', x: 0, y: 0, w: 1, h: 1, static: true},
          {i: '2', x: 0, y: 1, w: 1, h: 1, static: true},
          {i: '3', x: 0, y: 2, w: 1, h: 1, static: true},
          {i: '4', x: 2, y: 0, w: 2, h: 3, static: true},
          {i: '5', x: 2, y: 2, w: 1, h: 1, static: true},
          {i: '6', x: 2, y: 3, w: 1, h: 1, static: true}
        ],
       md:[
          {i: '1', x: 0, y: 0, w: 1, h: 1, static: true},
          {i: '2', x: 0, y: 1, w: 1, h: 1, static: true},
          {i: '3', x: 2, y: 0, w: 2, h: 2, static: true},
          {i: '4', x: 1, y: 0, w: 1, h: 1, static: true},
          {i: '5', x: 1, y: 0, w: 1, h: 1, static: true},
          {i: '6', x: 0, y: 2, w: 2, h: 2, static: true}
        ],
        sm:[
          {i: '1', x: 0, y: 0, w: 1, h: 1, static: true},
          {i: '2', x: 0, y: 1, w: 1, h: 1, static: true},
          {i: '3', x: 1, y: 0, w: 2, h: 2, static: true},
          {i: '4', x: 0, y: 2, w: 2, h: 2, static: true},
          {i: '5', x: 2, y: 2, w: 1, h: 1, static: true},
          {i: '6', x: 2, y: 3, w: 1, h: 1, static: true}
        ],
        xs:[
          {i: '1', x: 0, y: 0, w: 1, h: 1, static: true},
          {i: '2', x: 1, y: 0, w: 1, h: 1, static: true},
          {i: '3', x: 0, y: 1, w: 1, h: 1, static: true},
          {i: '4', x: 1, y: 1, w: 1, h: 1, static: true},
          {i: '5', x: 0, y: 2, w: 1, h: 1, static: true},
          {i: '6', x: 1, y: 2, w: 1, h: 1, static: true}
        ],
        xxs:[
          {i: '1', x: 0, y: 0, w: 1, h: 1, static: true},
          {i: '2', x: 0, y: 1, w: 1, h: 1, static: true},
          {i: '3', x: 0, y: 2, w: 1, h: 1, static: true},
          {i: '4', x: 0, y: 3, w: 1, h: 1, static: true},
          {i: '5', x: 2, y: 2, w: 1, h: 1, static: true},
          {i: '6', x: 2, y: 3, w: 1, h: 1, static: true}
        ],
     }
  

    return (
             <ResponsiveReactGridLayout className="layout" layouts={layouts} style={{width:'100%'}} 
             rowHeight={this.state.rowHeight}
             onWidthChange={this.onWidthChange.bind(this)}
             onBreakpointChange={this.onBreakpointChange.bind(this)}
             onLayoutChange={this.onLayoutChange.bind(this)}
              breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
              cols={{lg: 6, md: 4, sm: 3, xs: 2, xxs: 1}}>
              <div key={"1"}>
                <a href="#/dashboard/tematicas">
                      <Card style={{margin:'10px'}} className="card">
                        <CardMedia
                        overlay={<CardTitle title="Temáticas" subtitle="Registro de temáticas" />}
                      >
                        <img src="images/bg02.png" />

                      </CardMedia>

                </Card>
              </a>
              </div>
              <div key={"2"}>
                <a href="#/dashboard/servicios">
                  <Card style={{margin:'10px'}} >
                        <CardMedia
                        overlay={<CardTitle title="Servicios de Mapas" subtitle="Realize la apertura del proceso  de Admisión" />}
                      >
                        <img src="images/md.gif" />
                      </CardMedia>


                    </Card>
                  </a>
              </div>
              <div key={"3"}>
                <a  href="#/dashboard/periodos">
                    <Card style={{margin:'10px'}} className="card">
                    <CardMedia
                    overlay={<CardTitle title="Menu 3" subtitle="Registro del Menu 3" />}
                    >
                    <img src="images/bg02.png" />

                    </CardMedia>

                    </Card>
                </a>
              </div>
              <div key={"4"}>
                <a  href="#/dashboard/evaluaciones">
                  <Card style={{margin:'10px'}}>
                
                  <CardMedia
                    overlay={<CardTitle title="Menu 4" subtitle="Realize el registro de la evaluación de los postulantes" />}
                  >
                    <img src="images/bg05-01.png" />
                  </CardMedia>
                
      
                </Card>
              </a>
              </div>
              <div key={"5"}>
                  <Card style={{margin:'10px'}}>
                
                  <CardMedia
                    overlay={<CardTitle title="Menu 5" subtitle="Entrega de Constancia" />}
                  >
                    <img src="images/bg02.png" />
                  </CardMedia>
               
      
                </Card>

              </div>
              <div key={"6"}>
                 <a  href="#/dashboard/postulantes">
                  <Card style={{margin:'10px'}} className="card">
                        <CardMedia
                        overlay={<CardTitle title="Menu 6" subtitle="Consulte el listado de postulantes" />}
                      >
                        <img src="images/bg02-01.png" />

                      </CardMedia>

                </Card>
                </a>

              </div>
            </ResponsiveReactGridLayout>
      
    );
  }
}
