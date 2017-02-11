import React, { Component } from 'react';

import {Scene, Router, Actions} from 'react-native-router-flux';
import {StartScreen, HardSettings} from './scenes';
import { Provider } from 'react-redux';

import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

import reducers from './reducers';

function configureStore(reducers, preloadedState) {
    return createStore(reducers, applyMiddleware(thunk));
}

function prepareStore() {
    return configureStore(reducers);
}

class MobileClient extends Component {
    render() {
        let store = prepareStore();
        return <Provider store={store}>
                    <Router>
                        <Scene key="root">
                            <Scene key="startScreen" component={StartScreen} title="StartScreen"/>
                            <Scene key="hardSettings" component={HardSettings} title="HardSettings"/>
                        </Scene>
                    </Router>
                </Provider>
    }
}

export default MobileClient;