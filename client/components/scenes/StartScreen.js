import React, { Component } from 'react';
import { View, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';

class StartScreen extends Component {
    constructor() {
        super()
    }
    render() {
        return (
            <View style={styles.container}>
                <Button title='Device' onPress={Actions.deviceInfo}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF'
  }
});

export default StartScreen;