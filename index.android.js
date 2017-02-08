/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Application from './client/';
import {
  AppRegistry
} from 'react-native';

export default class MobileClient extends Component {
  render() {
    return <Application />
  }
}

AppRegistry.registerComponent('MobileClient', () => MobileClient);
