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
  escuelas(id){
    document.location.hash=`#/dashboard/facultades/${id}/escuelas`;
  }
  handleChangeSelect(key, event, index, value){
    let state = this.state;
    state[key] = value;
    this.setState(state);
    if(key=='tematica'){
      this.loadData(value);
    }
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
            <MenuItem onTouchTap={this.escuelas.bind(this,item.id)}>Escuelas</MenuItem>
            <MenuItem onTouchTap={this.edit.bind(this,item.id)}>Editar</MenuItem>
            <MenuItem onTouchTap={this.remove.bind(this,item.id)}>Delete</MenuItem>
            </IconMenu>
            );
            items.push(
                        <ListItem
                            key={index}
                           leftAvatar={<Avatar icon={<FileFolder />} />}
                            rightIconButton={rightIconMenu}
                            primaryText={item.nombre}
                            secondaryText={
                                <p>
                                {item.escuelas} escuelas registradas
                                </p>
                            }
                            secondaryTextLines={1}
                            />
                    );
            items.push(  <Divider key={'divider'+index} inset={true} />);

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
          <Card>
            <CardHeader
            title="Listado de Servicios de Mapas"
            subtitle="Inicio / Servicios"
             avatar="images/user0.jpg"
            />

            <CardText >
			<div className="row">
              <div className="col-md-4">
                <SelectField
					fullWidth
					floatingLabelText="Temática"
					value={this.state.tematica}
					onChange={(event, index, value)=>{this.handleChangeSelect('tematica',event, index, value)}}
					>
					{
						Object.keys(this.state.tematicas).map((key,index)=>{
							let item = Cache.getItem('tematica',key);
						return (<MenuItem key={index} value={item.id} primaryText={item.titulo} />)
						})
					}
				</SelectField>
              </div>

            </div>
   			<div className="row">
				<div className="col-md-5">
					 <List>
						{items}
					</List>
				</div>
				<div className="col-md-7">
				</div>
   			</div>
     
            </CardText>
        </Card>
         <FloatingActionButton style={style} href="#/dashboard/facultades/new">
            <ContentAdd />
            </FloatingActionButton>
        </div>
    );
  }
}
