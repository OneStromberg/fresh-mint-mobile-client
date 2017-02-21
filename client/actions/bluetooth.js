import { NativeAppEventEmitter } from 'react-native';
import BleManager from 'react-native-ble-manager';
import { Actions, Route, Board } from './../constants';
import * as navigation from './navigation';
import {Buffer} from 'buffer';
import _ from 'lodash';

var _scanTimeout = -1;

const CharacteristicUUID = {
    List: '34CD'
}

const ServiceUUID = {
    WiFi: '12AB'
}

const deserialize = (readData) => {
    let buffer = Buffer.from(readData, 'hex');
    let message =  buffer.toString('utf-8');
    let packages = message.split(',');
    let packageSize = packages[0];
    let packageBody = _.takeRight(packages, packages.length - 1);
    let unzippedResult = _.chunk(packageBody, packageSize);
    return _.zipObject(...unzippedResult);
}

export const subscribe = () => {
    console.log('Bluetooth subscribe');
    return (dispatch) => {
        NativeAppEventEmitter.addListener(Actions.Bluetooth.DidUpdateValueForCharacteristic, (data) => {
            dispatch({
                type: Actions.Bluetooth.DidUpdateValueForCharacteristic,
                data: data
            })
        });
        NativeAppEventEmitter.addListener(Actions.Bluetooth.BleManagerStopScan, (data) => {
            dispatch({
                type: Actions.Bluetooth.BleManagerStopScan,
                data: data
            })
        });
        NativeAppEventEmitter.addListener(Actions.Bluetooth.ConnectPeripheral, (data) => {
            dispatch({
                type: Actions.Bluetooth.ConnectPeripheral,
                data: data
            })
        });
        NativeAppEventEmitter.addListener(Actions.Bluetooth.DisconnectPeripheral, (data) => {
            dispatch({
                type: Actions.Bluetooth.DisconnectPeripheral,
                data: data
            })
        });
        NativeAppEventEmitter.addListener(Actions.Bluetooth.DiscoverPeripheral, (data) => {
            dispatch({
                type: Actions.Bluetooth.DiscoverPeripheral,
                data: data
            })
        });
    }
}

export const enable = () => {
    console.log('component started');
    return dispatch => {
        BleManager.enableBluetooth()
            .then(() => {
                // Success code 
                BleManager.start({showAlert: false});

                dispatch(subscribe());
                return dispatch({
                    type: Actions.Bluetooth.OnStart,
                    status: true
                })

                console.log('The bluetooh is already enabled or the user confirm');
            })
            .catch((error) => {
                // Failure code 
                console.log('The user refuse to enable bluetooth');
            });
    }
}

export const scan = (scanning) => {
    
    console.log('Scan', scanning);

    return (dispatch) => {
        if (scanning) {
                console.log('Scanning...');
                BleManager.scan([], 30, true).then(() => {
                    BleManager.getDiscoveredPeripherals([])
                        .then((peripheralsArray) => {
                            _scanTimeout = setTimeout(() => {
                                if (scanning) {
                                    dispatch(scan(scanning));
                                }
                            }, 3000);
                        });
                });
        } else {
            BleManager.stopScan()
            .then(() => {
                // Success code 
                console.log('Scan stopped');
            });
            clearTimeout(_scanTimeout);
        }

        return dispatch({
            type: Actions.Bluetooth.OnScan,
            scanning
        })
    }
}

export const read = (peripheralId, serviceUUID, characteristicUUID) => {
    return (dispatch) => {
        BleManager.read(peripheralId, serviceUUID, characteristicUUID)
            .then((readData) => {

                BleManager.checkState();
                let result = deserialize(readData);

                dispatch({
                    type:           Actions.Bluetooth.OnRead,
                    service:        serviceUUID,
                    characteristic: characteristicUUID,
                    data:           result
                });
            })
            .catch((error) => {
                console.log(error, peripheralId, serviceUUID, characteristicUUID);
            });
    }
}

export const writeWithoutResponse = (peripheralId, serviceUUID, characteristicUUID, data) => {
    return (dispatch) => {

        var req = [data.pin, data.value];
        let buffer = Buffer.from(req.toString(), 'utf8');
        let message = buffer.toString('base64');

        BleManager.writeWithoutResponse(peripheralId, serviceUUID, characteristicUUID,  )
            .then((callback) => {
                BleManager.checkState();
                dispatch({
                    type:           Actions.Bluetooth.OnWrite,
                    service:        serviceUUID,
                    characteristic: characteristicUUID,
                    data:           data
                });
            })
            .catch((error) => {
                console.log(error, peripheralId, serviceUUID, characteristicUUID);
            });
    }
}

export const write = (peripheralId, serviceUUID, characteristicUUID, data) => {
    return (dispatch) => {

        var req = [data.pin, data.value];
        let buffer = Buffer.from(req.toString(), 'utf8');
        let message = buffer.toString('base64');
        BleManager.write(peripheralId, serviceUUID, characteristicUUID, message )
            .then((callback) => {
                BleManager.checkState();
                dispatch({
                    type:           Actions.Bluetooth.OnWrite,
                    service:        serviceUUID,
                    characteristic: characteristicUUID,
                    data:           data
                });
            })
            .catch((error) => {
                console.log(error, peripheralId, serviceUUID, characteristicUUID);
            });
    }
}

export const connect = (id) => {
    return (dispatch) => {
        BleManager.connect(id)
            .then((peripheralInfo) => {
                dispatch({
                    type: Actions.Bluetooth.OnDeviceConnected,
                    peripheralInfo: peripheralInfo
                });
                dispatch(navigation.go(Route.ModuleSettings));
            })
            .catch((error) => {
                // Failure code
                console.log(error);
            });
            
        return dispatch(scan(false))
    }
} 

export const disconnect = (id) => {
    return (dispatch) => {
        BleManager.disconnect(id)
            .then((peripheralInfo) => {
                dispatch({
                    type: Actions.Bluetooth.DisconnectPeripheral,
                    peripheralInfo: peripheralInfo
                });
                dispatch(navigation.go(Route.StartScreen));
            })
            .catch((error) => {
                // Failure code
                console.log(error);
            });
    }
} 