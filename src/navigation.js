import React from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';
import {
  StackNavigator,
  SwitchNavigator,
  TabNavigator
} from 'react-navigation';
import Emoji from './components/Emoji';

import AccountSetupScreen from './screens/AccountSetupScreen';
import BootupScreen from './screens/BootupScreen';
import ExistingKeyScreen from './screens/ExistingKeyScreen';
import GenerateKeyScreen from './screens/GenerateKeyScreen';
import WelcomeScreen from './screens/WelcomeScreen';

class SendScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      headerTitle: 'Send CNDY',
      headerLeft: (
        <Button
          onPress={() => alert('This is a button!')}
          title="Info"
          color="#fff"
        />
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

class ReceiveScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      headerTitle: 'Receive CNDY',
      headerLeft: (
        <Button
          onPress={() => alert('This is a button!')}
          title="Info"
          color="#fff"
        />
      ),
      title: 'Receive'
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
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let emojiName;
        if (routeName === 'Send') {
          emojiName = 'money_with_wings';
        } else if (routeName === 'Receive') {
          emojiName = 'moneybag';
        }

        return (
          <Text style={{ fontSize: 30 }}>
            <Emoji name={emojiName} />
          </Text>
        );
      }
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray'
    },
    animationEnabled: true,
    swipeEnabled: true
  }
);

const KeySetupStack = StackNavigator(
  {
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
    }
  },
  {
    initialRouteName: 'Welcome',
    mode: 'modal',
    headerMode: 'none'
  }
);

const RootStack = SwitchNavigator(
  {
    Bootup: BootupScreen,
    Main: MainStack,
    KeySetup: KeySetupStack
  },
  {
    initialRouteName: 'Bootup'
  }
);

export default RootStack;
