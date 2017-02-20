import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {bluetooth} from './../../actions';
import { Text, View, StyleSheet, TouchableHighlight, ListView, Button } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  itemRenderer: {
      flex: 1
  }
});

class BleDeviceList extends Component {
    onConnectButtonPress(id) {
        this.peripheralId = id;
        this.props.connect(id)
    }

    renderButtonList(device) {
        return <Button style={styles.itemRenderer} title={device.name}
            onPress={event => this.onConnectButtonPress(device.id)}/>
    }
    render() {

        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        return (
            <View style={styles.container}>
                {this.props.list ? <ListView dataSource={ds.cloneWithRows(this.props.list)}
                                             renderRow={this.renderButtonList.bind(this)}/>
                        : <Text>{this.props.scanning ? 'no devices nearby' : 'run scan to find devices' }</Text>}
            </View>
        )
    }
}

const stateMap = (state, props, ownProps) => {
    return {
        scanning: state.componentSettings.bluetooth.scanning,
        list: state.componentSettings.bluetooth.list
    };
};

function mapDispatchToProps(dispatch) {
    return {
        connect: bindActionCreators(bluetooth.connect, dispatch)
    };
};

export default connect(stateMap, mapDispatchToProps)(BleDeviceList);