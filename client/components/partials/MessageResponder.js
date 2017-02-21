import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {bluetooth} from './../../actions';
import { Text, View, StyleSheet, Button, ListView, Switch } from 'react-native';
import _ from 'lodash';

const styles = StyleSheet.create({
  list: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  }
});

const toggleValue =(value) => {
    return value === 'on' ? 'off' : 'on'
}

class MessageResponder extends Component {
    createItemRenderer(data){
        let item = _.flatten(data);

        return <View>
                    <Text>{"Toggle " + item[0]}</Text>
                    <Text>{item[1]}</Text>
                    <Switch onValueChange={(value) => {
                            this.props.write(this.props.peripheralInfo.id, this.props.service, this.props.characteristic,{
                                pin:    item[0],
                                value:  toggleValue(item[1])
                            })  

                        }} value={item[1] == 'on'}/>
                </View>
    }
    render() {

        if (!this.props.messages) {
            return null;
        }

        let message = _.toPairs(this.props.messages[this.props.messages.length - 1]);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        let dataSource = ds.cloneWithRows(message);
            
        return <ListView style={styles.list}
                    dataSource={ dataSource }
                    renderRow={this.createItemRenderer} />
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
        write:  bindActionCreators(bluetooth.writeWithoutResponse, dispatch),
    };
};

export default connect(stateMap, mapDispatchToProps)(MessageResponder);