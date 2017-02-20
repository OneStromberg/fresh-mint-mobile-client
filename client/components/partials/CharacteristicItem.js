import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {bluetooth} from './../../actions';
import { Text, View, StyleSheet, Button } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

class CharacteristicItem extends Component {
    render() {
        return <View>
                    <Text>{this.props.characteristic}</Text>
                    <View style={styles.container}>
                        <Button onPress={() => { this.props.read(this.props.peripheralInfo.id, this.props.service, this.props.characteristic) }} title="Read"/>
                        <Button onPress={() => { this.props.write(this.props.peripheralInfo.id, this.props.service, this.props.characteristic ) }} title="Write"/>
                    </View>
                </View>
    }
}

function stateMap(state, props, ownProps) {
    return {
        peripheralInfo: state.componentSettings.bluetooth.peripheralInfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        read: bindActionCreators(bluetooth.read, dispatch),
        write: bindActionCreators(bluetooth.write, dispatch),
    };
};

export default connect(stateMap, mapDispatchToProps)(CharacteristicItem);