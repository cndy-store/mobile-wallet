import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TextInput
} from 'react-native';

class TransactionFailure extends Component {
  render() {
    return (
      <View>
        <Text>Failure! :(</Text>
      </View>
    );
  }
}

TransactionFailure.propTypes = {};

export default TransactionFailure;
