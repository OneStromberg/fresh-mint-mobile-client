import React, { Component } from 'react';
import { View, Button } from 'react-native';
import { connect } from 'react-redux';
import { Route } from './../../constants';
import { navigation } from './../../actions';

class StartScreen extends Component {
    constructor() {
        super()
    }
    render() {
        return (
            <View style={styles.container}>
                <Button title='Device' onPress={() => this.props.go(Route.DeviceInfo)}/>
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

function mapDispatchToProps(dispatch) {
    return {
        go: bindActionCreators(navigation.go, dispatch)
    };
};


export default connect(null, mapDispatchToProps)(StartScreen);