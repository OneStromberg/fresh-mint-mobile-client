import { combineReducers } from 'redux';

import componentSettings from './componentSettings';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

const combinedReducers = combineReducers({
    componentSettings
});

function configureStore() {
    return createStore(combinedReducers, applyMiddleware(thunk));
}

export default const Store = configureStore();
