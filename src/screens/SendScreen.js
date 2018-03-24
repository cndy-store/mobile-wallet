import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button, StyleSheet, View, Text } from 'react-native';
import { sendPayment } from '../lib/stellarAPI';
import HeaderWithBalance from '../components/HeaderWithBalance';

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
        <Button
          title="Go to Receive"
          onPress={() => this.props.navigation.navigate('Receive')}
        />

        <Text>Send Test Transaction</Text>
        <Button
          title="Send transaction"
          onPress={() => this.testTransaction()}
        />
      </View>
    );
  }
}

SendScreen.propTypes = {};

const mapStateToProps = state => {
  return {
    keypair: state.keypair.keypair
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SendScreen);
