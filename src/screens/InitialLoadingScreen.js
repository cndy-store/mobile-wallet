import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, StatusBar, StyleSheet, View } from 'react-native';

import { loadSecretKey } from '../actions/secretKey';

class InitialLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.loadSecretKey();
  }

  loadSecretKey = async () => {
    this.props.loadSecretKey().then(({ secretKey }) => {
      const secretKeyLoaded = !!secretKey;
      const nextScreen = secretKeyLoaded ? 'Main' : 'KeySetup';
      this.props.navigation.navigate(nextScreen);
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

InitialLoadingScreen.propTypes = {};

const mapStateToProps = state => {
  return {
    secretKeyIsLoading: state.secretKeyIsLoading,
    secretKeyLoadError: state.secretKeyLoadError,
    secretKey: state.secretKey
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadSecretKey: () => dispatch(loadSecretKey())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  InitialLoadingScreen
);
