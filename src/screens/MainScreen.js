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
import { loadPayments, markPaymentAsSeen } from '../actions/payments';
import {
  startPaymentsWatcher,
  stopPaymentsWatcher,
  startAcccountWatcher,
  stopAccountWatcher
} from '../lib/resourceWatcher';
import MainScreenHeader from '../components/MainScreenHeader';
import UnseenPaymentModal from '../components/UnseenPaymentModal';
import Send from '../components/Send';
import Receive from '../components/Receive';

export class MainScreen extends Component {
  constructor(props) {
    super(props);

    this.hideUnseenPayments = this.hideUnseenPayments.bind(this);

    this.startWatchers();
  }

  startWatchers = async () => {
    const publicKey = this.props.keypair.publicKey();

    try {
      await this.props.startAcccountWatcher(publicKey);
      await this.props.startPaymentsWatcher(publicKey);
    } catch (error) {
      Toast.show({
        text: 'Could not load account data. Please check internet connection.'
      });
    }
  };

  componentWillUnmount() {
    this.props.stopPaymentsWatcher();
    this.props.stopAccountWatcher();
  }

  hideUnseenPayments() {
    this.props.markPaymentAsSeen(this.props.unseenPayment.id);
  }

  renderModalContent() {
    if (!this.props.unseenPayment) return null;

    return (
      <UnseenPaymentModal
        payment={this.props.unseenPayment}
        onCancel={this.hideUnseenPayments}
      />
    );
  }

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
          {this.renderModalContent()}
        </Modal>
      </Container>
    );
  }
}

MainScreen.propTypes = {
  keypair: PropTypes.object.isRequired,
  unseenPayment: PropTypes.object,
  loadAccount: PropTypes.func.isRequired,
  markPaymentAsSeen: PropTypes.func.isRequired,
  startPaymentsWatcher: PropTypes.func.isRequired,
  stopPaymentsWatcher: PropTypes.func.isRequired,
  startAcccountWatcher: PropTypes.func.isRequired,
  stopAccountWatcher: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  let unseenPaymentId = state.payments.unseenPaymentIds[0];
  let unseenPayment;

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
  markPaymentAsSeen: paymentId => dispatch(markPaymentAsSeen({ paymentId })),
  startPaymentsWatcher: publicKey =>
    startPaymentsWatcher(dispatch, loadPayments, publicKey),
  stopPaymentsWatcher: stopPaymentsWatcher,
  startAcccountWatcher: publicKey =>
    startAcccountWatcher(dispatch, loadAccount, publicKey),
  stopAccountWatcher: stopAccountWatcher
});

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
