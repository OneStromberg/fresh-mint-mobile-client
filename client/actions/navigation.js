import { Actions as ActionsTypes, Route } from './../constants';
import { Actions } from 'react-native-router-flux';

export const back = () => {
    Actions.pop();
    return {
        type: ActionsTypes.Navigation.NavigationChanged
    };
}

export const checkPeripheralInfo = (peripheralInfo) => {
    if (peripheralInfo){
        return Actions[Route.ModuleSettings];
    }

    return Actions[Route.BleDevicesList];
}

export const go = (key) => {
    return (dispatch) => {
        dispatch({
            type: ActionsTypes.Navigation.NavigationChanged,
            key: key
        })
        switch(key){
            case Route.StartScreen:
                return Actions[Route.StartScreen];
            break;
            case Route.ModuleSettings:
                return checkPeripheralInfo;
            break;
            case Route.BleDevicesList:
                return checkPeripheralInfo;
            break;
        }
    }
}