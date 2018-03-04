import React from 'react';
import RootStack from './src/navigation';
import { Provider } from 'react-redux';
import configureStore from './src/store/configureStore';

const store = configureStore({
  secretKeyIsLoading: false,
  secretKeyLoadError: null,
  secretKeyIsSaving: false,
  secretKeySaveError: null,
  secretKey: null
});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RootStack />
      </Provider>
    );
  }
}
