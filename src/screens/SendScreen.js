import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button, StyleSheet, View, Text } from 'react-native';
import Modal from 'react-native-modal';

import { sendPayment } from '../lib/stellarAPI';
import HeaderWithBalance from '../components/HeaderWithBalance';
import BarCodeScanner from '../components/BarCodeScanner';
import { decodePublicKey } from '../lib/keypairHelpers';

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
      isModalVisible: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleScannedCode = this.handleScannedCode.bind(this);
  }

  openModal() {
    this.setState({ isModalVisible: true });
  }

  closeModal() {
    this.setState({ isModalVisible: false });
  }

  handleScannedCode(result) {
    console.warn(result);
    this.closeModal();
  }

  testTransaction() {
    const amount = '10.00';
    const receiver = 'GARYCROHQXWIQIRMGFRVFXDX53Y2RYUOYRJPB6OHLHIQ53AMLXM22EZL';

    console.info('starting...');
    sendPayment({ amount, receiver, keypair: this.props.keypair })
      .then(result => console.dir(result))
      .catch(result => console.warn(result));
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Send Screen</Text>
        <Button title="Scan Code" onPress={this.openModal} />

        <Text>Send Test Transaction</Text>
        <Button
          title="Send transaction"
          onPress={() => this.testTransaction()}
        />
        <Modal isVisible={this.state.isModalVisible} style={styles.modal}>
          <BarCodeScanner
            onCancel={this.closeModal}
            onCodeScan={this.handleScannedCode}
            decoder={decodePublicKey}
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
