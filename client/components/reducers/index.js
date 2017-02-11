import { combineReducers } from 'redux';

import ble from './ble';
import componentSettings from './componentSettings';

const combinedReducers = combineReducers({
    componentSettings
});

export default combinedReducers;