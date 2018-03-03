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
import ExistingKeyScreen from './screens/ExistingKeyScreen';
import GenerateKeyScreen from './screens/GenerateKeyScreen';
import ReceiveScreen from './screens/ReceiveScreen';
import SendScreen from './screens/SendScreen';
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
  MainTabs: {
    screen: TabNav,
    navigationOptions: {}
  }
});

// TODO? wrap mainstack in drawer?

const KeySetupStack = StackNavigator(
  {
    Welcome: { screen: WelcomeScreen },
    ExistingKey: { screen: ExistingKeyScreen },
    GenerateKey: { screen: GenerateKeyScreen },
    AccountSetup: { screen: AccountSetupScreen }
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
