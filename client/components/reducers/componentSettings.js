import { combineReducers } from 'redux';

import ble from './ble';

const combinedReducers = combineReducers({
    ble
});

export default combinedReducers;