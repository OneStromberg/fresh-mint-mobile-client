import { Actions } from './../constants';

let initialState = {
    list: null
};

export default function bluetooth(state = initialState, action) {
    switch (action.type){
        case Actions.Bluetooth.BleManagerConnectPeripheral:
        case Actions.Bluetooth.BleManagerDidUpdateValueForCharacteristic:
        case Actions.Bluetooth.BleManagerDisconnectPeripheral:
        case Actions.Bluetooth.BleManagerDiscoverPeripheral:
        case Actions.Bluetooth.BleManagerOnDeviceConnected:
            console.log('bluetooth', action);
        break;
    }
    return state;
}