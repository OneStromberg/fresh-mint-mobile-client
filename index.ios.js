import React, {Component} from 'react';
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

import {Buffer} from 'buffer';

const CharacteristicUUID = {
    List: '34CD'
}

const ServiceUUID = {
    WiFi: '12AB'
}

const container = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
}

class MobileClient extends Component {
    constructor() {
        super()

        this.state = {
            ble: null,
            connected:false,
            scanning: false
        }
    }
    componentDidMount() {
        BleManager.start({showAlert: false});
        NativeAppEventEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', (data) => {
            console.log(data)
        });
        NativeAppEventEmitter.addListener('BleManagerStopScan', () => {
            console.log('Scanning stopped.')
        });
        NativeAppEventEmitter.addListener('BleManagerConnectPeripheral', () => {
            console.log('Device connected.')
        });
        NativeAppEventEmitter.addListener('BleManagerDisconnectPeripheral', () => {
            console.log('Device connected.')
        });
    }
    handleScan() {
        BleManager.scan([], 30, true).then((results) => {
            console.log('Scanning...');
        });
    }
    toggleScanning() {
        if (this.state.scanning) {
            this.setState({scanning: true});
            this.scanning = setInterval(this.handleScan.bind(this), 3000);
        } else {
            this.setState({scanning: false, ble: null})
            clearInterval(this.scanning);
        }
    }
    onDeviceConnected(peripheralInfo){
        this.peripheralInfo = peripheralInfo;
        this.setState({
            connected:true
        })
    }
    getCurrentComponent(){
        return !this.state.connected && this.state.scanning ? 
            <SettingsScreen peripheralInfo={this.peripheralInfo} /> :
                <SearchForDevice onConnected={this.onDeviceConnected.bind(this)}/>
    }
    /*
        return BleManager.startNotification(peripheralInfo.id, ServiceUUID.WiFi, CharacteristicUUID.List).then((readData) => {
            // Success code
            var t = new Buffer(readData);
            console.log('Read:', t);
        })

        {this.state.ble ? <Button title='Disconnect' onPress={this.onDisconnectButtonPress}/> : null}
    */
    render() {
        return (
            <View style={container}>
                <TouchableHighlight
                    style={{
                        padding: 20,
                        backgroundColor: '#ccc'
                    }}
                    onPress={this.toggleScanning.bind(this)}>
                    <Text>Scan Bluetooth ({this.state.scanning ? 'on' : 'off'})</Text>
                </TouchableHighlight>
                {this.getCurrentComponent()}
            </View>
        );
    }
}

class SettingsScreen extends Component {
    componentDidMount() {

    }
    render() {
        return (
            <View style={container}>
                <Text>Device name: {this.peripheralInfo.name}</Text>
            </View>
        )
    }
}

class SearchForDevice extends Component {
    componentDidMount() {
        NativeAppEventEmitter.addListener('BleManagerDiscoverPeripheral', this.handleDiscoverPeripheral.bind(this));
    }
    componentWillUnmount(){
        NativeAppEventEmitter.removeListener('BleManagerDiscoverPeripheral');
    }
    onConnectButtonPress(id) {
        console.log('onButtonPress', id);
        this.peripheralId = id;
        BleManager
            .connect(id)
            .then((peripheralInfo) => {
                this.props.onDeviceConnected(peripheralInfo);
            })
            .catch((error) => {
                // Failure code
                console.log(error);
            });
    }
    handleDiscoverPeripheral(data) {
        if (data && data.name) {
            var o = {};
            o[data.id] = data;
            this.setState({
                ble: Object.assign({}, this.state.ble, o)
            });
        }
    }
    renderButtonList(device) {
        return <Button
            title={device.name}
            onPress={event => this.onConnectButtonPress(device.id)}/>
    }
    onDisconnectButtonPress(e) {
        var {peripheralId} = this;
        console.log('onDisconnectButtonPress', e);
    }
    getBleList() {
        var {ble} = this.state;
        var result = [];

        for (var id in ble) {
            result.push(ble[id]);
        }

        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        return ble
            ? <ListView
                    dataSource={ds.cloneWithRows(result)}
                    renderRow={this.renderButtonList}/>
            : <Text>no devices nearby</Text>
    }
    render() {
        return (
            <View style={container}>
                {this.getBleList()}
            </View>
        )
    }
}

AppRegistry.registerComponent('MobileClient', () => MobileClient);