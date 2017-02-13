import {
    NativeAppEventEmitter
} from 'react-native';

import BleManager from 'react-native-ble-manager';
import {Buffer} from 'buffer';

const CharacteristicUUID = {
    List: '34CD'
}

const ServiceUUID = {
    WiFi: '12AB'
}

export const subscribe = () => {
    return (dispatch) => {
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
        NativeAppEventEmitter.addListener('BleManagerDiscoverPeripheral', 
            this.handleDiscoverPeripheral.bind(this));
    }
}

const handleDiscoverPeripheral = (data) => {
    if (data && data.name) {
        var o = {};
        o[data.id] = data;
        this.setState({
            ble: Object.assign({}, this.state.ble, o)
        });
    }
}

export const scan = () => {
    return (dispatch) => {
        BleManager.scan([], 30, true).then((results) => {
            console.log('Scanning...');
        });
    }
}

export const connect = (id) => {
    return (dispatch) => {
        BleManager.connect(id)
            .then((peripheralInfo) => {
                this.props.onDeviceConnected(peripheralInfo);
            })
            .catch((error) => {
                // Failure code
                console.log(error);
            });
    }
} 