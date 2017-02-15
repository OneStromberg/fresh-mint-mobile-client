import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {bluetooth, navigation } from './../../actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  }
});

class DeviceInfo extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Device name:</Text>
                <Button title='Device' onPress={this.props.scan}/>
                <Button title='Back' onPress={this.props.back}/>
            </View>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        scan: bindActionCreators(bluetooth.scan, dispatch),
        back: bindActionCreators(navigation.back, dispatch)
    };
};

export default connect(stateMap)(DeviceInfo);