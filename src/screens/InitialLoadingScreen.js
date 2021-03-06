import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ActivityIndicator, StatusBar, StyleSheet, View } from 'react-native';
import { Toast } from 'native-base';
import { loadKeypair } from '../actions/keypair';

export class InitialLoadingScreen extends Component {
  constructor(props) {
    super(props);
    this.loadKeypair();
  }

  loadKeypair = async () => {
    const { keypair } = await this.props.loadKeypair();
    let nextScreen = 'KeySetup';
    if (keypair) {
      nextScreen = 'Main';
    }

    this.props.navigation.navigate(nextScreen);
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

InitialLoadingScreen.propTypes = {
  loadKeypair: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  })
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  loadKeypair: () => dispatch(loadKeypair())
});

export default connect(mapStateToProps, mapDispatchToProps)(
  InitialLoadingScreen
);
