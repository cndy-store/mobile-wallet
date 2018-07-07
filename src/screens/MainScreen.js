import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, View, Text } from 'react-native';
import {
  Button,
  Icon,
  Container,
  Header,
  Left,
  Right,
  Body,
  Title,
  Content,
  Toast,
  Tab,
  Tabs
} from 'native-base';
import Modal from 'react-native-modal';
import { find } from 'lodash';

import { loadAccount } from '../actions/account';
import modalStyle from '../styles/modal';
import { loadPayments } from '../actions/payments';
import {
  start as startPaymentWatcher,
  stop as stopPaymentWatcher
} from '../lib/paymentWatcher';
import MainScreenHeader from '../components/MainScreenHeader';
import UnseenPaymentModal from '../components/UnseenPaymentModal';
import Send from '../components/Send';
import Receive from '../components/Receive';

export class MainScreen extends Component {
  constructor(props) {
    super(props);

    this.hideUnseenPayments = this.hideUnseenPayments.bind(this);

    this.loadAccount();
  }

  loadAccount = async () => {
    const publicKey = this.props.keypair.publicKey();

    try {
      await this.props.loadAccount(publicKey);
      this.props.startPaymentWatcher(publicKey);
    } catch (error) {
      Toast.show({
        text: 'Could not load account data. Please check internet connection.'
      });
    }
  };

  componentWillUnmount() {
    this.props.stopPaymentWatcher();
  }

  hideUnseenPayments() {}

  render() {
    return (
      <Container>
        <MainScreenHeader />
        <Tabs initialPage={0}>
          <Tab heading="Send">
            <Send />
          </Tab>
          <Tab heading="Receive">
            <Receive />
          </Tab>
        </Tabs>
        <Modal isVisible={!!this.props.unseenPayment} style={modalStyle.modal}>
          <UnseenPaymentModal
            payment={this.props.unseenPayment}
            onCancel={this.hideUnseenPayments}
          />
        </Modal>
      </Container>
    );
  }
}

MainScreen.propTypes = {
  keypair: PropTypes.object.isRequired,
  loadAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  let unseenPaymentId = state.payments.unseenPaymentIds[0];
  let unseenPayment;

  // TODO: remove fake
  unseenPayment = state.payments.payments[0];

  if (unseenPaymentId) {
    unseenPayment = find(state.payments.payments, { id: unseenPaymentId });
  }

  return {
    keypair: state.keypair.keypair,
    unseenPayment: unseenPayment
  };
};

const mapDispatchToProps = dispatch => ({
  loadAccount: publicKey => dispatch(loadAccount(publicKey)),
  startPaymentWatcher: publicKey =>
    startPaymentWatcher(dispatch, loadPayments, publicKey),
  stopPaymentWatcher: stopPaymentWatcher
});

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
