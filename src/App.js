import React from 'react';
import NativeTachyons from 'react-native-style-tachyons';
import { StyleSheet } from 'react-native';
import { Root, StyleProvider } from 'native-base';
import RootStack from './navigation';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import getTheme from './native-base-theme/components';
import themeVariables from './native-base-theme/variables/platformCustomized';

const store = configureStore();

NativeTachyons.build({}, StyleSheet);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <StyleProvider style={getTheme(themeVariables)}>
          <Root>
            <RootStack />
          </Root>
        </StyleProvider>
      </Provider>
    );
  }
}
