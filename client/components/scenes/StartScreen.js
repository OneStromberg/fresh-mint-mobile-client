import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {Actions} from 'react-native-router-flux';

import {
  StyleSheet,
  Text,
  Button,
  View
} from 'react-native';

import {connect} from 'react-redux';

class StartScreen extends Component {
    onButtonPress(){
        Actions.hardSettings();
    }
    render() {
        return <View style={styles.container}>
                    <Text>Start Screen</Text>
                    <Button onPress={this.onButtonPress} title="Hard Settings"/>
                </View>
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

const stateMap = (state, props, ownProps) => {
    return {
        switches: {ble : state.componentSettings.ble}
    };
};

function mapDispatchToProps(dispatch) {
    return {
        routeSelect: bindActionCreators(analytics.routeClick, dispatch),
        switchSelect: bindActionCreators(analytics.switchClick, dispatch)
    };
};

export default connect(stateMap, mapDispatchToProps)(StartScreen);