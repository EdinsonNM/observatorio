import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Tematicas from'./tematicas';
import Tematica from'./tematica';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import {pink500, teal500, blue500} from 'material-ui/styles/colors';

const style = {
	marginRight: -40,
	position:'absolute',
	top: 70,
	right:'10px',
	zIndex:'1000'
};

export default class TematicaIndex extends React.Component {
  constructor (props) {
    super(props);
    this.state={
	  isNew:props.new||false,
	  isEdit:props.edit||false
    };
  }
  toggleNew(){
	this.setState({isNew:!this.state.isNew});
  }
  toggleEdit(data){
	  this.setState({isEdit:!this.state.isEdit,data:data});
  }

  render(){
  	let component;

	switch(true){
		case this.state.isNew:
			component = <Tematica back={this.toggleNew.bind(this)} />;
			break;
		case this.state.isEdit:
			component = <Tematica back={this.toggleEdit.bind(this)} data={this.state.data} edit={true}/>;
			break;
		default:
			component = <Tematicas onChange={this.props.onChange} edit={this.toggleEdit.bind(this)}/>
	}

	return(
		<div style={{width:'100%',height:'100%',position:'relative',overflow:'auto'}}>

			{
				(!this.state.isNew)?
				<Toolbar style={{backgroundColor:'white'}}>
					<ToolbarGroup firstChild={true}>
						<Avatar backgroundColor={pink500}  icon={<FontIcon  className="material-icons" color={pink500}>import_contacts</FontIcon>}  style={{marginLeft:'10px'}}/>
						<ToolbarTitle text="Temáticas" style={{marginLeft:'10px'}}/>
					</ToolbarGroup>
					<ToolbarGroup>
					 <IconButton onTouchTap={this.toggleNew.bind(this)} touch={true} >
						   	<FontIcon  className="material-icons" color={pink500}>add</FontIcon>
					   </IconButton>
					</ToolbarGroup>
				</Toolbar>
				:null
			}
			{component}


		</div>
	);
  }
}
