import React, { Component } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { Route } from './../../constants';
import { navigation } from './../../actions';
import { bindActionCreators } from 'redux';

class StartScreen extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Fresh Mint</Text>
                <View style={styles.center}>
                    <View style={styles.button}>
                        <Button title='Device Info' onPress={() => this.props.go(Route.BleDevicesList)(this.props.peripheralInfo)()}/>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF'
  },
  center: {
      justifyContent: 'center',
      flexDirection: 'row'
  },
  button: {
      width:300
  },
  title: {
    fontSize: 63,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

function stateMap(state, props, ownProps) {
    return {
        peripheralInfo: state.componentSettings.bluetooth.peripheralInfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        go: bindActionCreators(navigation.go, dispatch)
    };
};


export default connect(stateMap, mapDispatchToProps)(StartScreen);