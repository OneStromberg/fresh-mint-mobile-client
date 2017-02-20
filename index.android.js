/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Application from './client';
import { AppRegistry,   Platform, PermissionsAndroid } from 'react-native';

export default class MobileClient extends Component {
  componentDidMount(){
      if (Platform.OS === 'android' && Platform.Version >= 23) {
          PermissionsAndroid.checkPermission(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
              if (result) {
                console.log("Permission is OK");
              } else {
                PermissionsAndroid.requestPermission(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
                  if (result) {
                    console.log("User accept");
                  } else {
                    console.log("User refuse");
                  }
                });
              }
        });
      }
  }
  render() {
    return <Application />
  }
}

AppRegistry.registerComponent('MobileClient', () => MobileClient);
