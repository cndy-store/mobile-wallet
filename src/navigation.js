import React from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';
import {
  StackNavigator,
  SwitchNavigator,
  TabNavigator
} from 'react-navigation';
import Emoji from './components/Emoji';

import AccountSetupScreen from './screens/AccountSetupScreen';
import InitialLoadingScreen from './screens/InitialLoadingScreen';
import ScanSecretScreen from './screens/ScanSecretScreen';
import GenerateKeyScreen from './screens/GenerateKeyScreen';
import ReceiveScreen from './screens/ReceiveScreen';
import SendScreen from './screens/SendScreen';
import SettingsScreen from './screens/SettingsScreen';
import WelcomeScreen from './screens/WelcomeScreen';

const TabNav = TabNavigator(
  {
    Send: { screen: SendScreen },
    Receive: { screen: ReceiveScreen }
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

const MainStack = StackNavigator({
  MainTabs: { screen: TabNav },
  Settings: { screen: SettingsScreen }
});

const KeySetupStack = StackNavigator(
  {
    Welcome: { screen: WelcomeScreen },
    ScanSecret: { screen: ScanSecretScreen },
    GenerateKey: { screen: GenerateKeyScreen }
  },
  {
    initialRouteName: 'Welcome',
    mode: 'modal',
    headerMode: 'none'
  }
);

const RootStack = SwitchNavigator(
  {
    InitialLoading: InitialLoadingScreen,
    Main: MainStack,
    KeySetup: KeySetupStack
  },
  {
    initialRouteName: 'InitialLoading'
  }
);

export default RootStack;
