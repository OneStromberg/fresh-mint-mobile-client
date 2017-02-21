import { combineReducers } from 'redux';

import bluetooth from './bluetooth';

const combinedReducers = combineReducers({
    bluetooth,
});

export default combinedReducers;