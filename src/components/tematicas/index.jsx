import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Tematicas from'./tematicas';
import Tematica from'./tematica';

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
	  isNew:props.new||false
    };
  }
  toggleNew(){
	this.setState({isNew:!this.state.isNew});
  }
  
  render(){
  	let component;
  
	if(this.state.isNew){
		component = <Tematica back={this.toggleNew.bind(this)} />
	}else{
		component = <Tematicas onChange={this.props.onChange}/>
	}

	return(
		<div style={{width:'100%',height:'calc(100% - 64px)',position:'relative'}}>
			{component}
			{
				(!this.state.isNew)?
				<FloatingActionButton className="btn-tematica-new"  onTouchTap={this.toggleNew.bind(this)}>
					<ContentAdd />
				</FloatingActionButton>
				:null
			}
			
		</div>
	);
  }
}
