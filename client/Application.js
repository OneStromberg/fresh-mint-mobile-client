import React, { Component } from 'react';
import AppRouter from './components';

import { Provider } from 'react-redux';


import Store from './reducers'

class MobileClient extends Component {
  render() {
    return <Provider store={Store}>
              <AppRouter />
            </Provider>
  }
}

export default MobileClient;