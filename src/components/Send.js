import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Image, StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import {
  Button,
  Text,
  Icon,
  Card,
  CardItem,
  Container,
  Header,
  Left,
  Right,
  Body,
  Title,
  Content,
  Tab,
  Tabs
} from 'native-base';

import { loadAccount } from '../actions/account';
import BarCodeScanner from '../components/BarCodeScanner';
import TransactionSender from '../components/TransactionSender';
import { decodePublicKey } from '../lib/keypairHelpers';
import modalStyle from '../styles/modal';
import image from '../../assets/img/qr-code.png';

export class SendScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isScannerModalVisible: false,
      isSenderModalVisible: false
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
    this.props.loadAccount(this.props.keypair.publicKey());
    this.closeSenderModal();
  }

  handleTransactionFailure() {
    console.warn('FAILURE!');
    this.props.loadAccount(this.props.keypair.publicKey());
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

  render() {
    return (
      <Content padder>
        <Card>
          <CardItem header>
            <Text>Scan Receiver QR Code</Text>
          </CardItem>
          <CardItem cardBody>
            <Image
              style={{ flex: 1, width: null, height: 250 }}
              resizeMode={'contain'}
              source={image}
            />
          </CardItem>
          <CardItem>
            <Body>
              <Button block onPress={this.openScannerModal}>
                <Text>Scan QR Code</Text>
              </Button>
            </Body>
          </CardItem>
        </Card>
        <Button block transparent onPress={this.openSenderModal}>
          <Text>Manually Enter Receiver</Text>
        </Button>

        <Modal
          isVisible={this.state.isScannerModalVisible}
          style={modalStyle.modal}
        >
          <BarCodeScanner
            onCancel={this.closeScannerModal}
            onCodeScan={this.handleScannedCode}
            decoder={decodePublicKey}
          />
        </Modal>
        <Modal
          isVisible={this.state.isSenderModalVisible}
          style={modalStyle.modal}
        >
          <TransactionSender
            onCancel={this.closeSenderModal}
            onSuccess={this.handleTransactionSuccess}
            onFailure={this.handleTransactionFailure}
          />
        </Modal>
      </Content>
    );
  }
}

SendScreen.propTypes = {
  keypair: PropTypes.object.isRequired,
  loadAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  keypair: state.keypair.keypair
});

const mapDispatchToProps = dispatch => ({
  loadAccount: publicKey => dispatch(loadAccount(publicKey))
});

export default connect(mapStateToProps, mapDispatchToProps)(SendScreen);
