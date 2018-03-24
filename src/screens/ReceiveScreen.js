import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button, StyleSheet, View, Text } from 'react-native';
import { QRCode } from 'react-native-custom-qr-codes';
import { encodePublicKey } from '../lib/keypairHelpers';
import Emoji from '../components/Emoji';
import HeaderWithBalance from '../components/HeaderWithBalance';

export class ReceiveScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      headerTitle: <HeaderWithBalance />,
      headerLeft: (
        <Button onPress={() => navigation.navigate('Settings')} title="|||" />
      ),
      title: 'Receive'
    };
  };

  render() {
    const url = encodePublicKey(this.props.keypair.publicKey());
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <QRCode content={url} />
        <Text>Receive Screen</Text>
        <Button
          title="Go to Send"
          onPress={() => this.props.navigation.navigate('Send')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});

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
