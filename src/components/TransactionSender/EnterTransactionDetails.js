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

class EnterTransactionDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amountInput: ''
    };

    this.updateAmount = this.updateAmount.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateAmount(amountInput) {
    this.setState({ amountInput: sanitizeOngoingAmountInput(amountInput) });
  }

  handleSubmit() {
    this.props.onSubmit({ amountInput: this.state.amountInput });
  }

  renderError() {
    if (!this.props.error) return null;

    return <Text>{this.props.error}</Text>;
  }

  render() {
    return (
      <View>
        <ShortenedPublicKey publicKey={this.props.receiver} />
        <Text>Please enter your Amount</Text>
        <TextInput
          style={{
            width,
            height: 40,
            borderColor: 'gray',
            borderWidth: 1
          }}
          value={this.state.amountInput}
          autoCorrect={false}
          keyboardType={'numeric'}
          onChangeText={this.updateAmount}
        />
        <Button title="Next" onPress={this.handleSubmit} />
        {this.renderError()}
      </View>
    );
  }
}

EnterTransactionDetails.propTypes = {
  receiver: PropTypes.string.isRequired,
  error: PropTypes.string,
  onSubmit: PropTypes.func.isRequired
};

export default EnterTransactionDetails;
