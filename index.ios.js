import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  ListView,
  TouchableHighlight,
  NativeAppEventEmitter,
  Platform,
  Button,
  PermissionsAndroid
} from 'react-native';
import BleManager from 'react-native-ble-manager';

import { Buffer } from 'buffer';

const container = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
}

class MobileClient extends Component {

    constructor(){
        super()

        this.state = {
            ble:null,
            scanning:false,
        }
    }

    componentDidMount() {
        BleManager.start({showAlert: false});
        NativeAppEventEmitter.addListener('BleManagerDiscoverPeripheral', this.handleDiscoverPeripheral.bind(this) );
		NativeAppEventEmitter
			.addListener('BleManagerDidUpdateValueForCharacteristic', ( data ) => {
				console.log(data)
			});
		NativeAppEventEmitter
			.addListener('BleManagerStopScan', () => {
				console.log('Scanning stopped.')
			});
		NativeAppEventEmitter
			.addListener('BleManagerConnectPeripheral', () => {
				console.log('Device connected.')
			});
		NativeAppEventEmitter
			.addListener('BleManagerDisconnectPeripheral', () => {
				console.log('Device connected.')
			});
    }
    logUpdateValue(data){
        console.log('data', data);
    }
    handleDiscoverPeripheral(data){
        if (data && data.name) {
            var o = {};
            o[data.id] = data;
            o = Object.assign({},this.state.ble,o);
            this.setState({ 
                ble: o
            });
        }
    }
    handleScan() {
        BleManager.scan([], 30, true)
            .then((results) => {console.log('Scanning...'); });
    }

    toggleScanning(bool){
        if (bool) {
            this.setState({scanning:true})
            this.scanning = setInterval( ()=> this.handleScan(), 3000);
        } else {
            this.setState({scanning:false, ble: null})
            clearInterval(this.scanning);
        }
    }
    onButtonPress(id){
        console.log('onButtonPress', id);
        this.peripheralId = id;
        BleManager.connect(id)
            .then((peripheralInfo) => {
                // Success code
                console.log('Connected', peripheralInfo);
                this.setState({
                    scanning:false
                });
                
                clearInterval(this.scanning);
                BleManager.startNotification(peripheralInfo.id, '12AB', '34CD')
                .then((readData) => {
                    // Success code
                    var t = new Buffer(readData);
                    console.log('Read:', t);
                })
                .catch((error) => {
                    // Failure code
                    console.log(error);
                });
            })
            .catch((error) => {
                // Failure code
                console.log(error);
        });
    }
    onDisconnectButtonPress(e){
        var {peripheralId} = this;
        BleManager.stopNotification(peripheralId, '12AB', '34CD')
        .then(e => BleManager.disconnect(peripheralId))
        .catch(e => BleManager.disconnect(peripheralId));
    }
    render() {
        var {ble} = this.state;
        var result = [];

        for (var id in ble) {
            result.push(ble[id]);
        }
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2 && r1.name !== null});
        const bleList = this.state.ble
            ? <ListView dataSource={ds.cloneWithRows(result)}
                    renderRow={(device) => <Button title={device.name} onPress={ () => this.onButtonPress(device.id)}/>}
                />
            : <Text>no devices nearby</Text>

        return (
            <View style={container}>
                <TouchableHighlight
                    style={{padding:20, backgroundColor:'#ccc'}}
                    onPress={() => this.toggleScanning(!this.state.scanning) }>
                    <Text>Scan Bluetooth ({this.state.scanning ? 'on' : 'off'})</Text>
                </TouchableHighlight>
                <Button title='Disconnect' onPress={this.onDisconnectButtonPress}/>
                {bleList}
            </View>
        );
    }
}

AppRegistry.registerComponent('MobileClient', () => MobileClient);