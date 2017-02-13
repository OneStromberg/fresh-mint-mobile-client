import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {bluetooth} from './../actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

class BleDeviceList extends Component {
    componentDidMount() {
        this.props.start();
        NativeAppEventEmitter.addListener('BleManagerDiscoverPeripheral', this.handleDiscoverPeripheral.bind(this));
    }
    componentWillUnmount(){
        NativeAppEventEmitter.removeListener('BleManagerDiscoverPeripheral');
    }
    onConnectButtonPress(id) {
        console.log('onButtonPress', id);
        this.peripheralId = id;
        this.props.connect(id)
    }

    renderButtonList(device) {
        return <Button
            title={device.name}
            onPress={event => this.onConnectButtonPress(device.id)}/>
    }
    onDisconnectButtonPress(e) {
        var {peripheralId} = this;
        console.log('onDisconnectButtonPress', e);
    }
    render() {
        var {list} = this.props;
        var deviceList = [];

        for (var id in list) {
            deviceList.push(list[id]);
        }

        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        return (
            <View style={styles.container}>
                <TouchableHighlight
                    style={{
                        padding: 20,
                        backgroundColor: '#ccc'
                    }}
                    onPress={this.toggleScanning.bind(this)}>
                    <Text>Scan Bluetooth ({this.state.scanning ? 'on' : 'off'})</Text>
                </TouchableHighlight>
                {list ? <ListView
                            dataSource={ds.cloneWithRows(deviceList)}
                            renderRow={this.renderButtonList}/>
                        : <Text>no devices nearby</Text>}
            </View>
        )
    }
}

const stateMap = (state, props, ownProps) => {
    return {
        list: state.bluetooth.list
    };
};

function mapDispatchToProps(dispatch) {
    return {
        connect: bindActionCreators(bluetooth.connect, dispatch)
    };
};

export default connect(stateMap, null)(BleDeviceList);