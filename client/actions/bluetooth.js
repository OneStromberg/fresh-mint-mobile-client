import { NativeAppEventEmitter } from 'react-native';
import BleManager from 'react-native-ble-manager';
import { Actions } from './../constants'
import {Buffer} from 'buffer';

var scanning = -1;

const CharacteristicUUID = {
    List: '34CD'
}

const ServiceUUID = {
    WiFi: '12AB'
}

export const subscribe = () => {
    return (dispatch) => {
        NativeAppEventEmitter.addListener(Actions.Bluetooth.BleManagerDidUpdateValueForCharacteristic, (data) => {
            dispatch({
                type: Actions.Bluetooth.BleManagerDidUpdateValueForCharacteristic,
                data: data
            })
        });
        NativeAppEventEmitter.addListener(Actions.Bluetooth.BleManagerStopScan, (data) => {
            dispatch({
                type: Actions.Bluetooth.BleManagerStopScan,
                data: data
            })
        });
        NativeAppEventEmitter.addListener(Actions.Bluetooth.BleManagerConnectPeripheral, (data) => {
            dispatch({
                type: Actions.Bluetooth.BleManagerConnectPeripheral,
                data: data
            })
        });
        NativeAppEventEmitter.addListener(Actions.Bluetooth.BleManagerDisconnectPeripheral, (data) => {
            dispatch({
                type: Actions.Bluetooth.BleManagerDisconnectPeripheral,
                data: data
            })
        });
        NativeAppEventEmitter.addListener(Actions.Bluetooth.BleManagerDiscoverPeripheral, (data) => {
            dispatch({
                type: Actions.Bluetooth.BleManagerDiscoverPeripheral,
                data: data
            })
        });
    }
}

export const scan = (enable) => {
    if (enable) {
        scanning = setInterval(_scan, 3000);
    } else {
        clearInterval(scanning);
    }
}

const _scan = () => {
    BleManager.scan([], 30, true).then((results) => {
        console.log('Scanning...');
    });
}

export const connect = (id) => {
    return (dispatch) => {
        BleManager.connect(id)
            .then((peripheralInfo) => {
                dispatch({
                    type: Actions.Bluetooth.BleManagerDiscoverPeripheral,
                    peripheralInfo: peripheralInfo
                })
            })
            .catch((error) => {
                // Failure code
                console.log(error);
            });
    }
} 