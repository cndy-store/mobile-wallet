import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button, StyleSheet, View, Text } from 'react-native';
import Modal from 'react-native-modal';

import { sendPayment } from '../lib/stellarAPI';
import HeaderWithBalance from '../components/HeaderWithBalance';
import BarCodeScanner from '../components/BarCodeScanner';
import TransactionSender from '../components/TransactionSender';
import { decodePublicKey } from '../lib/keypairHelpers';

const amount = '10.00';
const receiver = 'GARYCROHQXWIQIRMGFRVFXDX53Y2RYUOYRJPB6OHLHIQ53AMLXM22EZL';

export class SendScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      headerTitle: <HeaderWithBalance />,
      headerLeft: (
        <Button onPress={() => navigation.navigate('Settings')} title="|||" />
      ),
      title: 'Send'
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      isScannerModalVisible: false,
      isSenderModalVisible: true
    };

    this.openSenderModal = this.openSenderModal.bind(this);
    this.closeSenderModal = this.closeSenderModal.bind(this);
    this.handleTransactionSuccess = this.handleTransactionSuccess.bind(this);
    this.handleTransactionFailure = this.handleTransactionFailure.bind(this);
    this.openScannerModal = this.openScannerModal.bind(this);
    this.closeScannerModal = this.closeScannerModal.bind(this);
    this.handleScannedCode = this.handleScannedCode.bind(this);
  }

  openSenderModal() {
    this.setState({ isSenderModalVisible: true });
  }

  closeSenderModal() {
    this.setState({ isSenderModalVisible: false });
  }

  handleTransactionSuccess() {
    console.warn('success!');
    this.closeSenderModal();
  }

  handleTransactionFailure() {
    console.warn('FAILURE!');
    this.closeSenderModal();
  }

  openScannerModal() {
    this.setState({ isScannerModalVisible: true });
  }

  closeScannerModal() {
    this.setState({ isScannerModalVisible: false });
  }

  handleScannedCode(result) {
    console.warn(result);
    this.closeScannerModal();
  }

  testTransaction() {
    console.info('starting...');
    sendPayment({ amount, receiver, keypair: this.props.keypair })
      .then(result => console.dir(result))
      .catch(result => console.warn(result));
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Send Screen</Text>
        <Button title="Scan Code" onPress={this.openScannerModal} />

        <Text>Show transaction</Text>
        <Button title="Open Transaction Modal" onPress={this.openSenderModal} />

        <Text>Send Test Transaction</Text>
        <Button
          title="Send transaction"
          onPress={() => this.testTransaction()}
        />
        <Modal
          isVisible={this.state.isScannerModalVisible}
          style={styles.modal}
        >
          <BarCodeScanner
            onCancel={this.closeScannerModal}
            onCodeScan={this.handleScannedCode}
            decoder={decodePublicKey}
          />
        </Modal>
        <Modal isVisible={this.state.isSenderModalVisible} style={styles.modal}>
          <TransactionSender
            onCancel={this.closeSenderModal}
            onSuccess={this.handleTransactionSuccess}
            onFailure={this.handleTransactionFailure}
          />
        </Modal>
      </View>
    );
  }
}

SendScreen.propTypes = {};

const styles = StyleSheet.create({
  modal: {
    margin: 0
  }
});

const mapStateToProps = state => {
  return {
    keypair: state.keypair.keypair
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SendScreen);
