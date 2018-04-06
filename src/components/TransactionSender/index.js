import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, StatusBar, StyleSheet, View, TextInput } from 'react-native';
import Dimensions from 'Dimensions';
import ShortenedPublicKey from '../../components/ShortenedPublicKey';
import EnterTransactionReceiver from './EnterTransactionReceiver';
import EnterTransactionDetails from './EnterTransactionDetails';
import ConfirmTransactionDetails from './ConfirmTransactionDetails';
import TransactionInProgress from './TransactionInProgress';
import TransactionSuccess from './TransactionSuccess';
import TransactionFailure from './TransactionFailure';
import { parseTransactionAmount } from '../../lib/formatter';
import { isValidPublicKey } from '../../lib/keypairHelpers';

const { width, height } = Dimensions.get('window');

class TransactionSender extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: props.amount,
      amountError: null,
      receiver: props.receiver,
      receiverError: null,
      inProgress: false,
      error: false,
      response: null
    };

    this.handleReceiverUpdate = this.handleReceiverUpdate.bind(this);
    this.handleAmountUpdate = this.handleAmountUpdate.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleConfirmation = this.handleConfirmation.bind(this);
    this.handleRejection = this.handleRejection.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
  }

  handleCancel() {
    this.props.onCancel();
  }

  handleReceiverUpdate({ receiverInput }) {
    if (isValidPublicKey(receiverInput)) {
      this.setState({ receiver: receiverInput, receiverError: null });
    } else {
      this.setState({ receiverError: 'Invalid public key' });
    }
  }

  handleAmountUpdate({ amountInput }) {
    const amount = parseTransactionAmount(amountInput);

    if (amount) {
      this.setState({ amount, amountError: null });
    } else {
      this.setState({ amountError: 'Invalid amount' });
    }
  }

  handleConfirmation() {
    this.setState({ inProgress: true });
  }

  handleRejection() {
    this.setState({
      amount: null,
      amountError: 'Please enter a new amount'
    });
  }

  handleSuccess() {
    this.props.onSuccess();
  }

  handleFailure() {
    this.props.onFailure();
  }

  renderSubview() {
    if (!this.state.receiver) {
      return (
        <EnterTransactionReceiver
          error={this.state.receiverError}
          onSubmit={this.handleReceiverUpdate}
        />
      );
    } else if (!this.state.amount) {
      return (
        <EnterTransactionDetails
          receiver={this.state.receiver}
          error={this.state.amountError}
          onSubmit={this.handleAmountUpdate}
        />
      );
    } else if (this.state.amount && !this.state.inProgress) {
      return (
        <ConfirmTransactionDetails
          receiver={this.state.receiver}
          amount={this.state.amount}
          onConfirm={this.handleConfirmation}
          onReject={this.handleRejection}
        />
      );
    } else if (this.state.inProgress) {
      return <TransactionInProgress />;
    } else if (this.state.response && !this.state.error) {
      return <TransactionSuccess />;
    } else if (this.state.error) {
      return <TransactionFailure />;
    } else {
      throw 'Invalid configuration of TransactionSender';
    }
  }

  render() {
    return <View style={styles.container}>{this.renderSubview()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    height,
    backgroundColor: '#ffffff'
  }
});

TransactionSender.defaultProps = {
  amount: null,
  receiver: null
};

TransactionSender.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onFailure: PropTypes.func.isRequired,
  amount: PropTypes.string,
  receiver: PropTypes.string
};

export default TransactionSender;
