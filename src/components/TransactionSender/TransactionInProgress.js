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
import Dimensions from 'Dimensions';

const { width, height } = Dimensions.get('window');

class TransactionInProgress extends Component {
  render() {
    return (
      <View>
        <Text>In Progress...</Text>
      </View>
    );
  }
}

TransactionInProgress.propTypes = {};

export default TransactionInProgress;
