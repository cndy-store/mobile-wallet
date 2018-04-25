import React from 'react';
import NativeTachyons from 'react-native-style-tachyons';
import { StyleSheet } from 'react-native';
import RootStack from './src/navigation';
import { Provider } from 'react-redux';
import configureStore from './src/store/configureStore';

const store = configureStore();

NativeTachyons.build({}, StyleSheet);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RootStack />
      </Provider>
    );
  }
}
