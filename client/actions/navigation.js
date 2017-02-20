import { Actions as ActionsTypes, Route } from './../constants';
import { Actions } from 'react-native-router-flux';

export const back = () => {
    Actions.pop();
    return {
        type: ActionsTypes.Navigation.NavigationChanged
    };
}

export const go = (key) => {
    return (dispatch) => {
        switch(key){
            case Route.StartScreen:
                Actions.startScreen();
            break;
            case Route.HardSettings:
                Actions.hardSettings();
            break;
            case Route.DeviceInfo:
                Actions.deviceInfo();
            break;
        }
        dispatch({
            type: ActionsTypes.Navigation.NavigationChanged,
            key: key
        })
    }
}