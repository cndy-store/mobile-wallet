import React from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';
import { QRCode } from 'react-native-custom-qr-codes';
import Emoji from '../components/Emoji';
import HeaderWithBalance from '../components/HeaderWithBalance';

export default class ReceiveScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      headerTitle: <HeaderWithBalance />,
      headerLeft: (
        <Button onPress={() => navigation.navigate('Settings')} title="|||" />
      ),
      title: 'Receive'
    };
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <QRCode content="https://reactnative.com" />
        <Text>Receive Screen</Text>
        <Button
          title="Go to Send"
          onPress={() => this.props.navigation.navigate('Send')}
        />
      </View>
    );
  }
}
