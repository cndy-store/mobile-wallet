import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Image, View, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';
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

import animationSource from '../../assets/lottie/scan_qr_code_success.json';

const animationSize = 250;

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

  componentDidMount() {
    this.animation.play();
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
    const scanCodeButtonCaption = this.state.isScannerModalVisible
      ? 'Opening Camera...'
      : 'Scan QR Code';

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
            <CardItem>
              <Body>
                <Text>
                  Scan your private key from the QR code that was created for
                  you.
                </Text>
              </Body>
            </CardItem>
            <CardItem cardBody>
              <View style={[styles.animationContainer]}>
                <View style={[styles.lottieWrapper]}>
                  <LottieView
                    style={[styles.lottieAnimation]}
                    ref={animation => {
                      this.animation = animation;
                    }}
                    source={animationSource}
                  />
                </View>
              </View>
            </CardItem>
            <CardItem>
              <Body>
                <Button
                  block
                  disabled={this.isScannerModalVisible}
                  onPress={this.openScannerModal}
                >
                  <Text>{scanCodeButtonCaption}</Text>
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

const styles = StyleSheet.create({
  animationContainer: {
    flex: 1,
    width: '100%',
    height: animationSize,
    justifyContent: 'center',
    alignItems: 'center'
  },
  lottieWrapper: {
    flex: 1,
    width: '100%',
    height: animationSize
  },
  lottieAnimation: {
    height: animationSize
  }
});

const mapStateToProps = state => ({
  inProgress: state.keypair.inProgress,
  error: state.keypair.error
});

const mapDispatchToProps = dispatch => ({
  saveKeypair: secret => dispatch(saveKeypair(secret))
});

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen);
