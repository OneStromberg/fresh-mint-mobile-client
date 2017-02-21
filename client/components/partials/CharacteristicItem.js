import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {bluetooth} from './../../actions';
import { Text, View, StyleSheet, Button } from 'react-native';
import _ from 'lodash';

import MessageResponder from './MessageResponder';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  }
});

class CharacteristicItem extends Component {
    render() {
        return <View>
                    <Text>{this.props.characteristic}</Text>

                    <View style={styles.container}>
                        <Button onPress={() => { this.props.read(this.props.peripheralInfo.id, this.props.service, this.props.characteristic) }} title="Read"/>
                    </View>
                    <View>
                        <MessageResponder characteristic={this.props.characteristic}/>
                    </View>
                </View>
    }
}

function stateMap(state, props, ownProps) {
    return {
        messages:           state.componentSettings.bluetooth.messages[props.characteristic],
        peripheralInfo:     state.componentSettings.bluetooth.peripheralInfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        read:   bindActionCreators(bluetooth.read, dispatch)
    };
};

export default connect(stateMap, mapDispatchToProps)(CharacteristicItem);