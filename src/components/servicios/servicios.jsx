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
import {GridList, GridTile} from 'material-ui/GridList';

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
	  data:[]
    };
  }
  
  componentWillMount(){
    this.loadData();
  }
  componentDidMount(){
    service.on((error,data)=>{
      this.loadData();
    })
  }
  componentWillUnmount(){
      service.off();
  }
  loadData(tematicaID){
    service.getAll({},(error,data)=>{
        this.setState({data:data});
    },true);
  }
  remove(id){
    console.log(id);
    service.delete(id,null);
    this.loadData();
  }
  edit(id){
    document.location.hash=`#/dashboard/facultades/${id}/edit`;
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
					<div className="col-md-3">
						<Card>
					
								<CardMedia>
									<img src="images/bg01-01.png" />
								</CardMedia>
								<CardTitle title="titulo" subtitle="Card subtitle" />

								<CardActions>
								<FlatButton label="Action1" />
								<FlatButton label="Action2" />
								</CardActions>
							</Card>
						</div>
                    );

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
             avatar="images/user0.jpg"
			 titleColor="#FFF"
			 subtitleColor="#FFF"
            />

            <CardText >

			<div className="row">
				{items}
			</div>
            </CardText>

        </div>
    );
  }
}
