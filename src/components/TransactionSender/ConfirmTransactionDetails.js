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
import ShortenedPublicKey from '../../components/ShortenedPublicKey';
import { sanitizeOngoingAmountInput } from '../../lib/formatter';

const { width, height } = Dimensions.get('window');

class ConfirmTransactionDetails extends Component {
  constructor(props) {
    super(props);

    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleReject = this.handleReject.bind(this);
  }

  handleConfirm() {
    this.props.onConfirm();
  }

  handleReject() {
    this.props.onReject();
  }

  render() {
    return (
      <View>
        <ShortenedPublicKey publicKey={this.props.receiver} />
        <Text>Amount:</Text>
        <Text
          style={{
            width,
            height: 40
          }}
        >
          {this.props.amount}
        </Text>
        <Button title="Confirm!" onPress={this.handleConfirm} />
        <Button title="Change!" onPress={this.handleReject} />
      </View>
    );
  }
}

ConfirmTransactionDetails.propTypes = {
  receiver: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired
};

export default ConfirmTransactionDetails;
