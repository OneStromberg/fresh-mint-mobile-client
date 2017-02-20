import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {bluetooth} from './../../actions';
import {Actions} from 'react-native-router-flux';
import CharacteristicItem from './../partials/CharacteristicItem';

import {
  StyleSheet,
  Text,
  Button,
  View,
  ListView,
  TouchableHighlight
} from 'react-native';

class HardSettings extends Component {
  constructor(props){
      super(props);
  }
  onButtonPress(){
      Actions.hardSettings();
  }
  render() {

      if (this.props.peripheralInfo === null) {
            return <Text>Disconnecting...</Text>
      }

      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      let dataSource = ds.cloneWithRows(this.props.peripheralInfo.characteristics);

      return <View style={styles.container}>
                  <Text>{this.props.peripheralInfo.name}</Text>
                        <ListView style={styles.list}
                                dataSource={ dataSource }
                                renderRow={(data) => <CharacteristicItem {...data} /> } />
                  <Button onPress={() => this.props.disconnect(this.props.peripheralInfo.id)} title="Disconnect"/>
                  <Button onPress={Actions.pop} title="Back"/>
              </View>
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

function stateMap(state, props, ownProps) {
    return {
        peripheralInfo: state.componentSettings.bluetooth.peripheralInfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        disconnect: bindActionCreators(bluetooth.disconnect, dispatch)
    };
};

export default connect(stateMap, mapDispatchToProps)(HardSettings);