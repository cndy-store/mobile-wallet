import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View
} from 'react-native';

export default class BootupScreen extends React.Component {
  constructor() {
    super();
    this.loadKeypair();
  }

  loadKeypair = async () => {
    let keypair = await AsyncStorage.getItem('keypair');
    keypair = true;
    this.props.navigation.navigate(keypair ? 'Main' : 'KeySetup');
  };

  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
