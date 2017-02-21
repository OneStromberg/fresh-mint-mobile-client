import { Actions } from './../constants';

let initialState = {
    list: {},
    scanning: false,
    peripheralInfo: null,
    messages: {
        
    }
};

export default function bluetooth(state = initialState, action) {
    switch (action.type){
        case Actions.Bluetooth.ConnectPeripheral:
            console.log('ConnectPeripheral', action);
            break;
        case Actions.Bluetooth.DidUpdateValueForCharacteristic:
            break;
        case Actions.Bluetooth.DisconnectPeripheral:
            state = {...state, peripheralInfo: null}
            break;
        case Actions.Bluetooth.DiscoverPeripheral:
        
            if (action.data && action.data.name) {
                var o = state.list;
                o[action.data.id] = action.data;
                state = Object.assign({}, state, {
                    list: o
                });
            }

            break;
        case Actions.Bluetooth.StopScan:
            break;
        case Actions.Bluetooth.OnRead:

            let characteristicUUID = action.characteristic;
            let messages = state.messages;
            let charMessages = [];

            if (messages[characteristicUUID]) {
                charMessages = messages[characteristicUUID];
            }

            charMessages.push(action.data);

            messages[characteristicUUID] = charMessages;

            state = {...state, messages: messages}
            break;
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