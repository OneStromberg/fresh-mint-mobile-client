import React, { Component } from 'react';
import { Route } from './../constants'
import {Scene, Router} from 'react-native-router-flux';
import {StartScreen, ModuleSettings, BleDevicesList} from './scenes';

class AppRouter extends Component {
    render() {
        return  <Router>
                    <Scene hideNavBar 
                           panHandlers={null}
                           duration={1} 
                           key="root">
                        <Scene key={Route.StartScreen}     component={StartScreen}     title="StartScreen" initial />
                        <Scene key={Route.BleDevicesList}  component={BleDevicesList}  title="DeviceInfo"/>
                        <Scene key={Route.ModuleSettings}  component={ModuleSettings}  title="HardSettings"/>
                    </Scene>
                </Router>
    }
}

export default AppRouter;