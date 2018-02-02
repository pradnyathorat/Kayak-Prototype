import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import registerServiceWorker from './registerServiceWorker';

import {Provider} from 'react-redux';
import { BrowserRouter, Route,withRouter } from 'react-router-dom';
import {compose, applyMiddleware, createStore} from 'redux';
import {persistStore, autoRehydrate} from 'redux-persist';
import reduxReset from 'redux-reset';
import allReducers from './reducers';
//import {NotificationContainer, NotificationManager} from 'react-notifications';
import HomePage from './components/HomePage';

import {MuiThemeProvider} from 'material-ui/styles';
import App from './App';
import 'react-notifications/lib/notifications.css';

const enHanceCreateStore = compose(
    reduxReset(),
    autoRehydrate(),
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__(),
  )(createStore)
const store = enHanceCreateStore(allReducers)

//persistStore(store);

persistStore(store, {}, () => {
    ReactDOM.render(    
        <Provider store = {store}>
            <MuiThemeProvider>
                <BrowserRouter> 
                    <App />
                </BrowserRouter>
            </MuiThemeProvider>
        
        </Provider>
        
    , 
    document.getElementById('root')
    );
})
registerServiceWorker();

