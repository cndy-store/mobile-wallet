import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button, StyleSheet, View, Text } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { encodePublicKey } from '../lib/keypairHelpers';

export class ReceiveScreen extends Component {
  render() {
    const url = encodePublicKey(this.props.keypair.publicKey());
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <QRCode value={url} elc="M" />
        <Text>Receive Screen</Text>
        <Button
          title="Go to Send"
          onPress={() => this.props.navigation.navigate('Send')}
        />
      </View>
    );
  }
}

ReceiveScreen.propTypes = {};

const mapStateToProps = state => {
  return {
    keypair: state.keypair.keypair
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ReceiveScreen);
