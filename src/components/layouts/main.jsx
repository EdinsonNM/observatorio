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
import Menu from 'material-ui/svg-icons/navigation/menu';
import Paper from 'material-ui/Paper';

import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);
import TematicasUI from '../tematicas';
import ServiciosUI from '../servicios';
const style={
  appbar:{
    color:'#c6c6c6',
	backgroundColor:'white'
  }
}
import Sidebar from './sidebar';
export default class Admin extends React.Component {
  constructor () {
    super();
    this.state={
      open:false,
      rowHeight:200,
	  tematicaId:0
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
   
  }

    componentWillUnmount(){
      window.removeEventListener("resize", null);
    }
	 handleDrawerToggle(){
    this.refs.sidebar.handleDrawerToggle();
    //this.setState({open: !this.state.open});
  } 
  handleChangeTematica(id){
	  console.log(id);
	  this.setState({tematicaId:id});
  }

  render(){
    
    return (
          
		     <div className="window-container">

				<Paper className="tematica-container" zDepth={2}>
					
					<TematicasUI onChange={this.handleChangeTematica.bind(this)}/>
				</Paper>
				<Paper style={{backgroundColor:'var(--paper-teal-700)'}} className="servicios-container visible-sm-inline-block visible-md-inline-block visible-lg-inline-block" zDepth={1}>
					{
						(this.state.tematicaId!=0)?
						<ServiciosUI tematicaId={this.state.tematicaId}/>
						:
						null
					}
					
				</Paper>
			</div>
      
    );
  }
}
