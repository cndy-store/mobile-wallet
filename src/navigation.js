import React from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

import AccountSetupScreen from './screens/AccountSetupScreen';
import BootupScreen from './screens/BootupScreen';
import ExistingKeyScreen from './screens/ExistingKeyScreen';
import GenerateKeyScreen from './screens/GenerateKeyScreen';
import WelcomeScreen from './screens/WelcomeScreen';

class SendScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      title: 'Send💸'
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

class ReceiveScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      title: 'Receive💰'
    };
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Receive Screen</Text>
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

const MainStack = TabNavigator(
  {
    Send: {
      screen: SendScreen
    },
    Receive: {
      screen: ReceiveScreen
    }
  },
  {
    initialRouteName: 'Send',
    /* The header config from HomeScreen is now here */
    navigationOptions: {}
  }
);

const RootStack = StackNavigator(
  {
    Bootup: {
      screen: BootupScreen
    },
    Welcome: {
      screen: WelcomeScreen
    },
    ExistingKey: {
      screen: ExistingKeyScreen
    },
    GenerateKey: {
      screen: GenerateKeyScreen
    },
    AccountSetup: {
      screen: AccountSetupScreen
    },
    Main: {
      screen: MainStack
    }
  },
  {
    initialRouteName: 'Main',
    mode: 'modal',
    headerMode: 'none'
  }
);

export default RootStack;
