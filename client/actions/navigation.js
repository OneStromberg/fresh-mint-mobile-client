import { Actions as ActionsTypes, Route } from './../constants';
import { Actions } from 'react-native-router-flux';

export const back = (key) => {
    Actions.pop();
}

export const go = (key) => {
    return (dispatch) => {
        switch(key){
            case Route.StartScreen:
                Actions.StartScreen();
            break;
            case Route.HardSettings:
                Actions.HardSettings();
            break;
            case Route.DeviceInfo:
                Actions.DeviceInfo();
            break;
        }
        dispatch({
            types: ActionsTypes.Navigation.NavigationChanged,
            key: key
        })
    }
}