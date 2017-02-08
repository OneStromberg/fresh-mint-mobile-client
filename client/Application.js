import React, { Component } from 'react';

import {Scene, Router, Actions} from 'react-native-router-flux';
import {StartScreen, HardSettings} from './scenes';

class MobileClient extends Component {
  render() {
    return <Router>
      <Scene key="root">
        <Scene key="startScreen" component={StartScreen} title="StartScreen"/>
        <Scene key="hardSettings" component={HardSettings} title="HardSettings"/>
      </Scene>
    </Router>
  }
}

export default MobileClient;