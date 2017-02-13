import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {bluetooth} from './../actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

class DeviceInfo extends Component {
    handleScan() {
        this.props.scan();
    }
    toggleScanning() {
        if (this.state.scanning) {
            this.setState({scanning: true});
            this.scanning = setInterval(this.handleScan.bind(this), 3000);
        } else {
            this.setState({scanning: false, ble: null})
            clearInterval(this.scanning);
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>Device name: {this.props.bluetooth.peripheralInfo.name}</Text>
            </View>
        )
    }
}

const stateMap = (state, props, ownProps) => {
    return {
        bluetooth: state.componentSettings.bluetooth
    };
};

function mapDispatchToProps(dispatch) {
    return {
        scan: bindActionCreators(bluetooth.scan, dispatch)
    };
};

export default connect(stateMap, mapDispatchToProps)(DeviceInfo);