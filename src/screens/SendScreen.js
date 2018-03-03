import React from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';

export default class SendScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      headerTitle: 'Send CNDY',
      headerLeft: (
        <Button onPress={() => navigation.navigate('Settings')} title="|||" />
      ),
      title: 'Send'
    };
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Send Screen</Text>
        <Button
          title="Go to Receive"
          onPress={() => this.props.navigation.navigate('Receive')}
        />
      </View>
    );
  }
}
