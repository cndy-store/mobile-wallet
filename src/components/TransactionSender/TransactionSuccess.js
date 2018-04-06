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

class TransactionSuccess extends Component {
  render() {
    return (
      <View>
        <Text>Success!</Text>
      </View>
    );
  }
}

TransactionSuccess.propTypes = {};

export default TransactionSuccess;
