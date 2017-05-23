import React from 'react';
import ReactDOM from 'react-dom';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import {teal500, darkBlack, lightBlack,blue300,indigo900} from 'material-ui/styles/colors';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import Subheader from 'material-ui/Subheader';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import UserService from '../../services/UserService';
import FileFolder from 'material-ui/svg-icons/file/folder';
import moment from 'moment';
let service = new UserService();
export default class Usuarios extends React.Component {
  constructor (props) {
    super(props);
    this.state={
      data:[]
    };
  }


  componentWillMount(){
    this.loadData();
  }
  loadData(){
    service.getAll({},(error,data)=>{
        console.log(error,data);
        this.setState({data:data});
    },true);
  }
  componentDidMount(){

  }
  remove(id){
    console.log(id);
    service.delete(id,null);
    this.loadData();
  }
  edit(id){
    document.location.hash=`#/dashboard/periodos/${id}/edit`;
  }
  render(){

    const iconButtonElement = (
        <IconButton
        touch={true}
        tooltip="more"
        tooltipPosition="bottom-left"
        >
        <MoreVertIcon color={teal500} />
        </IconButton>
        );


    let items=[];
    let itemsCurrent=[];
    let currentYear = new Date().getFullYear();
    this.state.data.forEach((item,index)=>{
        let rightIconMenu = (
            <IconMenu iconButtonElement={iconButtonElement}>
            <MenuItem onTouchTap={this.edit.bind(this,item.id)}>Editar</MenuItem>
            <MenuItem onTouchTap={this.remove.bind(this,item.id)}>Delete</MenuItem>
            </IconMenu>
            );
            let user = UserService.me();
        if(item.id==user.id){
            itemsCurrent.push(
                    <ListItem
                        key={index}
                         leftAvatar={<Avatar icon={<FileFolder />} style={{color:'red'}} />}
                        primaryText={item.apellidos+', '+item.nombres}
                        secondaryText={
                            <p>
                             <strong>{(item.isAdmin)?'Administrador':'Usuario'}</strong> <br/> {item.email}
                            </p>
                        }
                        secondaryTextLines={2}
                        />
                );
                itemsCurrent.push( <Divider key={'divider'+index} inset={true} />)

        }else{
            items.push(
                       <ListItem
                        key={index}
                         leftAvatar={<Avatar icon={<FileFolder />} style={{color:'red'}} />}
                        rightIconButton={rightIconMenu}
                        primaryText={item.apellidos+', '+item.nombres}
                        secondaryText={
                            <p>
                             <strong>{(item.isAdmin)?'Administrador':'Usuario'}</strong> <br/> {item.email}
                            </p>
                        }
                        secondaryTextLines={2}
                        />
                    );
            items.push(  <Divider key={'divider'+index} inset={true} />);

        }
    });

    const style = {
        marginRight: 20,
        position:'fixed',
        bottom:'10px',
        right:'10px',
        zIndex:'1000'
    };
    return (
         <div className="flex layout vertical center-center " style={{width:'100%',height:'100%'}}>
            <Card  style={{width:'100%',height:'100%'}}>
                <CardHeader
                title="Listado de Usuarios"
                subtitle="Mantenimiento"
                avatar={  <Avatar
                            icon={<FontIcon className="material-icons">supervisor_account</FontIcon>}

                            backgroundColor={teal500}
                            size={30}
                            />}
                />

                <CardText >
                    Listados de usuarios que administran el sistema
                    <List>
                        <Subheader>Yo</Subheader>
                        {itemsCurrent}
                    </List>
                    <List>
                        <Subheader>Otros Usuarios</Subheader>
                        {items}
                    </List>
                    </CardText>
            </Card>
            <FloatingActionButton style={style} href="#/dashboard/usuarios/new">
            <ContentAdd />
            </FloatingActionButton>
        </div>
    );
  }
}
