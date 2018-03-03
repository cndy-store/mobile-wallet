import React from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';
import AccountSetupScreen from './src/screens/AccountSetupScreen';
import BootupScreen from './src/screens/BootupScreen';
import ExistingKeyScreen from './src/screens/ExistingKeyScreen';
import GenerateKeyScreen from './src/screens/GenerateKeyScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      title: 'Home'
    };
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      title: 'Details'
    };
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

const MainStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Details: {
      screen: DetailsScreen
    }
  },
  {
    initialRouteName: 'Home',
    /* The header config from HomeScreen is now here */
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }
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
    initialRouteName: 'Bootup',
    mode: 'modal',
    headerMode: 'none'
  }
);

export default class App extends React.Component {
  // TODO: put state here?

  render() {
    return <RootStack />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcc',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
