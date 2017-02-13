import React, { Component } from 'react';
import {Actions} from 'react-native-router-flux';
import {
  StyleSheet,
  Text,
  Button,
  View
} from 'react-native';

class HardSettings extends Component {
  constructor(props){
      super(props);
  }
  onButtonPress(){
      Actions.hardSettings();
  }
  render() {
      return <View style={styles.container}>
                  <Text>Start Screen</Text>
                  <Button onPress={Actions.pop} title="Back"/>
              </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

export default HardSettings;