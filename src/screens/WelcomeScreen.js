import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Image, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import {
  Icon,
  Body,
  Card,
  CardItem,
  Container,
  Header,
  Left,
  Right,
  Content,
  Button,
  Text,
  Title
} from 'native-base';

import BarCodeScanner from '../components/BarCodeScanner';
import EnterSecretModal from '../components/EnterSecretModal';
import { decodeSecret } from '../lib/keypairHelpers';
import { saveKeypair } from '../actions/keypair';
import modalStyle from '../styles/modal';
import image from '../../assets/img/qr-code.png';

export class WelcomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isScannerModalVisible: false,
      isTextInputModalVisible: false
    };

    this.openTextInputModal = this.openTextInputModal.bind(this);
    this.closeTextInputModal = this.closeTextInputModal.bind(this);
    this.handleTextInput = this.handleTextInput.bind(this);

    this.openScannerModal = this.openScannerModal.bind(this);
    this.closeScannerModal = this.closeScannerModal.bind(this);
    this.handleScannedCode = this.handleScannedCode.bind(this);
  }

  openTextInputModal() {
    this.setState({ isTextInputModalVisible: true });
  }

  closeTextInputModal() {
    this.setState({ isTextInputModalVisible: false });
  }

  handleTextInput(result) {
    this.closeTextInputModal();
    this.saveKeypair(result);
  }

  openScannerModal() {
    this.setState({ isScannerModalVisible: true });
  }

  closeScannerModal() {
    this.setState({ isScannerModalVisible: false });
  }

  handleScannedCode({ secret }) {
    this.closeScannerModal();
    this.saveKeypair(secret);
  }

  saveKeypair(secret) {
    this.props
      .saveKeypair(secret)
      .then(() => {
        this.props.navigation.navigate('Main');
      })
      .catch(() => {
        Alert.alert('Could not save secret!');
      });
  }

  render() {
    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>Setup</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Card>
            <CardItem header>
              <Text>Setup your keypair</Text>
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
          <Button block transparent onPress={this.openTextInputModal}>
            <Text>Manually Enter Secret</Text>
          </Button>
        </Content>

        <Modal
          isVisible={this.state.isScannerModalVisible}
          style={modalStyle.modal}
        >
          <BarCodeScanner
            onCancel={this.closeScannerModal}
            onCodeScan={this.handleScannedCode}
            decoder={decodeSecret}
          />
        </Modal>
        <Modal
          isVisible={this.state.isTextInputModalVisible}
          style={modalStyle.modal}
        >
          <EnterSecretModal
            onCancel={this.closeTextInputModal}
            onSubmit={this.handleTextInput}
          />
        </Modal>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    inProgress: state.keypair.inProgress,
    error: state.keypair.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveKeypair: secret => dispatch(saveKeypair(secret))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen);
