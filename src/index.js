import React from 'react';
import {StatusBar} from 'react-native';
import Routes from './routes';
import 'react-native-gesture-handler';
// import {createStore} from 'redux';
import {Provider} from 'react-redux';
import store from './store';
// import allReducers from './reducers';

// const store = createStore(allReducers);

export default function App(){
    return(
        <> 
            <StatusBar barStyle="light-content" backgroundColor="#D50000" />
            <Provider store={store}>
                <Routes />
            </Provider>
        </>
    )
}

