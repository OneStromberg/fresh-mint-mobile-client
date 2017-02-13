import React, {Component} from 'react';
import {
    View,
    Button,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import BleDeviceList from './../partials/BleDeviceList';
import SettingsScreen from './../partials/SettingsScreen';
import {bindActionCreators} from 'redux';

class StartScreen extends Component {
    constructor() {
        super()
    }
    onConnectDevice() {
        Actions.deviceInfo();
    }
    render() {
        return (
            <View style={styles.container}>
                <Button title='Device' onPress={this.onConnectDevice}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

export default StartScreen;