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
        <Text>Success!</Text>
        <Button title={'Ok'} onPress={this.handleAcknowledge} />
      </View>
    );
  }
}

TransactionSuccess.propTypes = {
  onAcknowledge: PropTypes.func.isRequired
};

export default TransactionSuccess;
