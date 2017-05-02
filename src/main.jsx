//require('es6-promise').polyfill();
import { Router, hashHistory } from 'react-router';
import ReactDOM from 'react-dom';
import routes from './routes.jsx';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Auth from './services/Auth';
import nativeToast from 'native-toast'
import UserService from './services/UserService';
import TematicaService from './services/TematicaService';
import {cyan500, cyan800, amber500} from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: cyan800,
        primary2Color: cyan500,
        accent1Color: amber500
    }
});
const initUI = function () {
    const route = (
        <MuiThemeProvider muiTheme={muiTheme}>
            <Router history={hashHistory}>{routes}</Router>
        </MuiThemeProvider>
    );
    ReactDOM.render(route,document.querySelector("#app"));
    console.log(' %c STOP: %c This browser feature is intended for developers.!', 'color: red; font-weight: bold; font-size:20px;','color:green;font-size:20px;');
}

Auth.init((error,user) => {
    if (error) {
		initUI();
    }
    else{
        nativeToast({
            message: 'Bienvenido, estamos optimizando tu experiencia!',
            position: 'top',
            timeout: 5000
        });
        Auth.me((error, data) => {
            UserService.setMe(data);
			if (UserService.me().isAnonymous) {
				initUI()
			} else {
				let tematicaService = new TematicaService();

                tematicaService.getAll({}, (error, data) => {
					initUI();
				}, true);
			}
        });
    }
});

//injectTapEventPlugin();
