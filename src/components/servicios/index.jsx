import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Servicios from'./servicios';
import Servicio from'./servicio';

const style = {
	marginRight: -40,
	position:'absolute',
	top: 70,
	right:'10px',
	zIndex:'1000'
};

export default class ServicioIndex extends React.Component {
  constructor (props) {
    super(props);
    this.state={
	  isNew:props.new||false,
		isEdit:props.edit||false,
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
	switch (true) {
		case this.state.isNew:
			component = <Servicio back={this.toggleNew.bind(this)} tematicaId={this.props.tematicaId} edit={false}/>
			break;
		case this.state.isEdit:
			component = <Servicio back={this.toggleEdit.bind(this)} tematicaId={this.props.tematicaId} data={this.state.data} edit={true}/>
			break;
		default:
			component = <Servicios tematicaId={this.props.tematicaId} edit={this.toggleEdit.bind(this)}/>
	}

	return(
		<div style={{width:'100%',height:'100%',position:'relative',padding:'20px','overflowY':'auto'}}>
			{component}
			{
				(!this.state.isNew)?
				<FloatingActionButton className="btn-servicio-new"  onTouchTap={this.toggleNew.bind(this)} secondary={true}>
					<ContentAdd />
				</FloatingActionButton>
				:null
			}
			
		</div>
	);
  }
}
