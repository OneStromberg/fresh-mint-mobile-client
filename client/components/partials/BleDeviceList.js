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
    alignSelf: 'stretch'
  },
  itemRenderer: {
      flex: 1,
      flexDirection:'row'
  },
  message: {
      textAlign: 'center'
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
                {this.props.list.length > 0 ? <ListView dataSource={ds.cloneWithRows(this.props.list)}
                                             renderRow={this.renderButtonList.bind(this)}/>
                        : <Text style={styles.message}>
                            {this.props.scanning ? 'no devices nearby' : `First you should find your module\nPress search button to toggle searching` }
                        </Text>}
            </View>
        )
    }
}

const stateMap = (state, props, ownProps) => {
    return {
        list: Object.values(state.componentSettings.bluetooth.list)
    };
};

function mapDispatchToProps(dispatch) {
    return {
        connect: bindActionCreators(bluetooth.connect, dispatch)
    };
};

export default connect(stateMap, mapDispatchToProps)(BleDeviceList);