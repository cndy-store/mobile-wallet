import React from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';
import Emoji from '../components/Emoji';

export default class ReceiveScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      headerTitle: 'Receive CNDY',
      headerLeft: (
        <Button onPress={() => navigation.navigate('Settings')} title="|||" />
      ),
      title: 'Receive'
    };
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Receive Screen</Text>
        <Button
          title="Go to Send"
          onPress={() => this.props.navigation.navigate('Send')}
        />
      </View>
    );
  }
}
