import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View
} from 'react-native';

export default class InitialLoadingScreen extends React.Component {
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
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
