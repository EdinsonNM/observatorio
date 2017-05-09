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
import {List, ListItem, makeSelectable} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import Subheader from 'material-ui/Subheader';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import TematicaService from '../../services/TematicaService';
import {pink500, teal500, blue500} from 'material-ui/styles/colors';

import FileFolder from 'material-ui/svg-icons/file/folder';
let SelectableList = makeSelectable(List);

import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import RaisedButton from 'material-ui/RaisedButton';
const style={
  appbar:{
    backgroundColor:'var(--paper-purple-700)'
  }
}

let service = new TematicaService();
export default class Tematicas extends React.Component {
  constructor (props) {
    super(props);
    this.state={
      data:[],
	  isNew:false
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
  loadData(){
    service.getAll({},(error,data)=>{
        this.setState({data:data});
    },true);
  }
  remove(id){
    console.log(id);
    service.delete(id,null);
    this.loadData();
  }
  edit(item){
    this.props.edit(item);
  }
  disabled(value){
    this.setState({disabled:value})
  }

  handleRequestChange (event, index){
	  this.props.onChange(index);
      this.setState({
        selectedIndex: index,
      });
    };
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
            <MenuItem onTouchTap={this.edit.bind(this,item)}>Editar</MenuItem>
            <MenuItem onTouchTap={this.remove.bind(this,item.id)}>Delete</MenuItem>
            </IconMenu>
            );
            items.push(
                        <ListItem
                            key={index}
							value={item.id}
                           leftAvatar={<Avatar icon={<FontIcon  className="material-icons" color={pink500}>view_carousel</FontIcon>} backgroundColor={teal500}/>}
                            rightIconButton={rightIconMenu}
                            primaryText={item.titulo}
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
        marginRight: -40,
        position:'absolute',
        top: 70,
        right:'10px',
        zIndex:'1000'
    };

		return (
			<div style={{width:'100%',height:'calc( 100% - 64px)',position:'relative',overflowY:'auto'}}>
				<SelectableList defaultValue={2}  value={this.state.selectedIndex}  onChange={this.handleRequestChange.bind(this)}>
				<Subheader>Listado de Temáticas</Subheader>
				{items}
				</SelectableList>
			</div>
			);


  }
}
