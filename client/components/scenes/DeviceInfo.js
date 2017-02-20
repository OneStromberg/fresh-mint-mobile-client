import React, { Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BleDeviceList from './../partials/BleDeviceList';
import {bluetooth, navigation } from './../../actions';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    }
});

class DeviceInfo extends Component {
    componentDidMount(){
        this.props.enable();
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.container}>
                    <Button title={this.props.scanning ? 'Stop scanning' : 'Scan for device'}
                            onPress={() => this.props.scan(!this.props.scanning)}/>
                    <BleDeviceList />
                </View>
                <Button title='Back' onPress={this.props.back}/>
            </View>
        )
    }
}

function stateMap(state, props, ownProps) {
    return {
        scanning: state.componentSettings.bluetooth.scanning
    }
}

function mapDispatchToProps(dispatch) {
    return {
        scan: bindActionCreators(bluetooth.scan, dispatch),
        enable: bindActionCreators(bluetooth.enable, dispatch),
        back: bindActionCreators(navigation.back, dispatch)
    };
};

export default connect(stateMap, mapDispatchToProps)(DeviceInfo);