import { Actions } from './../constants';

let initialState = {
    list: null,
    scanning: false,
    peripheralInfo: null
};

export default function bluetooth(state = initialState, action) {
    switch (action.type){
        case Actions.Bluetooth.ConnectPeripheral:
            console.log('ConnectPeripheral', action);
            break;
        case Actions.Bluetooth.DidUpdateValueForCharacteristic:
        case Actions.Bluetooth.DisconnectPeripheral:
            state = {...state, peripheralInfo: null}
            break;
        case Actions.Bluetooth.DiscoverPeripheral:
        
            if (action.data && action.data.name) {
                var o = {};
                o[action.data.id] = action.data;
                state = Object.assign({}, state, {
                    list: o
                });
            }

            break;
        case Actions.Bluetooth.StopScan:
        case Actions.Bluetooth.OnDeviceConnected:
            console.log('bluetooth', action);
            state = {...state, peripheralInfo: action.peripheralInfo}
            break;
        case Actions.Bluetooth.OnScan:
            state = {...state, scanning: action.scanning};
        break;
    }
    return state;
}