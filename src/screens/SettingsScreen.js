import React from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';
import ViewWithNavigationLink from '../components/ViewWithNavigationLink';

export default class SettingsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      headerTitle: 'Settings'
    };
  };
  render() {
    return (
      <View>
        <Text>Settings</Text>
      </View>
    );
  }
}
