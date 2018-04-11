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
  constructor(props) {
    super(props);

    this.handleAcknowledge = this.handleAcknowledge.bind(this);
  }

  handleAcknowledge() {
    this.props.onAcknowledge();
  }

  render() {
    return (
      <View>
        <Text>Failure! :(</Text>
        <Button title={'Ok'} onPress={this.handleAcknowledge} />
      </View>
    );
  }
}

TransactionFailure.propTypes = {
  onAcknowledge: PropTypes.func.isRequired
};

export default TransactionFailure;
