import React from 'react';
import ReactDOM from 'react-dom';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import Subheader from 'material-ui/Subheader';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import MapaService from '../../services/MapaService';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FileFolder from 'material-ui/svg-icons/file/folder';
import Cache from '../../services/Cache';
import SelectField from 'material-ui/SelectField';
import {pink500, teal500, blue500} from 'material-ui/styles/colors';


const style={
  appbar:{
    backgroundColor:'var(--paper-purple-700)'
  }
}

let service = new MapaService();
export default class Mapas extends React.Component {
  constructor (props) {
    super(props);
    this.state={
      tematicas: Cache.getData('tematica'),
	  tematicaId: this.props.tematicaId,
	  data:[]
    };
  }

  componentWillMount(){
    this.loadData();
  }
  componentDidMount(){
    this.loadData();
  }

  componentWillReceiveProps(nextProps, nextState){
	   this.setState({tematicaId:nextProps.tematicaId},()=>{
		this.loadData();
	   });
  }

  loadData(){
	  console.log('load data...');
    service.getAll({},(error,data)=>{
        this.setState({data:data});
    },false,this.state.tematicaId);
  }
  remove(id){
	service.delete(id,()=>{

	},this.props.tematicaId)
	this.loadData();
  }
  edit(item){
    this.props.edit(item);
  }


  render(){

    const iconButtonElement = (
        <IconButton
        touch={true}
        tooltip="more"
        tooltipPosition="bottom-left"
        >
        <MoreVertIcon color={grey400} />
        </IconButton>
        );

    let items=[];
    this.state.data.forEach((item,index)=>{
          let rightIconMenu = (
            <IconMenu iconButtonElement={iconButtonElement}>
            <MenuItem onTouchTap={this.edit.bind(this,item.id)}>Editar</MenuItem>
            <MenuItem onTouchTap={this.remove.bind(this,item.id)}>Delete</MenuItem>
            </IconMenu>
            );
            items.push(

              <div className="card" key={index}>
                <div className="card-block">

                  <p className="card-text">
                    <small className="text-muted">
                        <strong>{item.title}</strong>
                        <br/>
                        type:{item.serverType}
                        <br/>
                        layer:{item.layer}
                        </small>
                  </p>
                   <p className="card-text">
                        <button type="button" className="btn  btn-outline-secondary btn-sm" onClick={this.edit.bind(this,item)} style={{margin:5}}>
                          <span className="material-icons">mode_edit</span>
                        </button>
                        <button type="button" className="btn btn-outline-secondary btn-sm" onClick={this.remove.bind(this,item.id)}  style={{margin:5}}>
                          <span className="material-icons">delete</span>
                        </button>
                    </p>
                </div>
              </div>

            );
            /*items.push(
					<div className="col-lg-3 col-md-4 col-sm-6" key={index} style={{paddingBottom:'10px'}}>
						<Card>

								<CardMedia overlay={
									<div>
								<IconButton touch={true} >
										<FontIcon  className="material-icons" color="white">search</FontIcon>
								</IconButton>
								<IconButton touch={true} onTouchTap={this.edit.bind(this,item)} >
										<FontIcon  className="material-icons" color="white">mode_edit</FontIcon>
								</IconButton>
								<IconButton touch={true} >
										<FontIcon  className="material-icons" color="white" onTouchTap={this.remove.bind(this,item.id)}>delete</FontIcon>
								</IconButton>
								</div>
								}>
									<img src="./visor/images/bg01-01.png" />
								</CardMedia>
								<CardTitle subtitle={item.title} />


							</Card>
						</div>
                    );*/

    });
     const style = {
        marginRight: 20,
        position:'fixed',
        bottom:'10px',
        right:'10px',
        zIndex:'1000'
    };
    return (
      <div>
            <CardHeader
            title={ this.state.tematicas[this.props.tematicaId].titulo }
            subtitle="Listados de Servicios de Mapa por temática"
             avatar={<Avatar icon={<FontIcon  className="material-icons" color={pink500}>view_carousel</FontIcon>} backgroundColor={teal500}/>}
			 titleColor="#FFF"
			 subtitleColor="#FFF"
            />

            <div className="card-columns">
                {items}
            </div>
        </div>
    );
  }
}
