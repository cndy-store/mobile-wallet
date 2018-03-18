import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, StatusBar, StyleSheet, View } from 'react-native';

import { loadKeypair } from '../actions/keypair';

class InitialLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.loadKeypair();
  }

  loadKeypair = async () => {
    this.props.loadKeypair().then(({ keypair }) => {
      const keypairLoaded = !!keypair;
      const nextScreen = keypairLoaded ? 'Main' : 'KeySetup';
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
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    loadKeypair: () => dispatch(loadKeypair())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  InitialLoadingScreen
);
