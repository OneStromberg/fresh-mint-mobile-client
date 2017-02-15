import React, { Component } from 'react';
import { Route } from './../constants'
import {Scene, Router} from 'react-native-router-flux';
import {StartScreen, HardSettings, DeviceInfo} from './scenes';

class AppRouter extends Component {
    render() {
        return  <Router>
                    <Scene key="root">
                        <Scene key={Route.StartScreen} component={StartScreen} title="StartScreen" initial={true}/>
                        <Scene key={Route.HardSettings} component={HardSettings} title="HardSettings"/>
                        <Scene key={Route.DeviceInfo} component={DeviceInfo} title="DeviceInfo"/>
                    </Scene>
                </Router>
    }
}

export default AppRouter;