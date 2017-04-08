import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react';
import ReactDOM from 'react-dom';
import Login from './components/login/login.jsx';
import Admin from './components/layouts/admin.jsx';

//import Video from './models/Video';
injectTapEventPlugin();
window.React = React;
//window.componentHandler = componentHandler;
export default class App extends React.Component{
  constructor () {
    super();
    this.state = {
        loading:false
    };
  }
  render(){
    return (this.props.children);
  }

}