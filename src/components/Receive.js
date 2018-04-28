import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  Icon,
  Container,
  Header,
  Left,
  Right,
  Body,
  Title,
  Content,
  Tab,
  Card,
  CardItem,
  Tabs
} from 'native-base';
import { Button, StyleSheet, View, Text } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { encodePublicKey } from '../lib/keypairHelpers';

export class ReceiveScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qrCodeWidth: null
    };

    this.setQRCodeWidth = this.setQRCodeWidth.bind(this);
  }

  setQRCodeWidth(event) {
    var { x, y, width, height } = event.nativeEvent.layout;

    this.setState({ qrCodeWidth: width });
  }

  renderQRCode() {
    if (!this.state.qrCodeWidth) return;

    const url = encodePublicKey(this.props.keypair.publicKey());
    return <QRCode size={this.state.qrCodeWidth} value={url} elc="M" />;
  }

  render() {
    return (
      <Content padder>
        <Card>
          <CardItem cardBody onLayout={this.setQRCodeWidth}>
            {this.renderQRCode()}
          </CardItem>
        </Card>
        <Card>
          <CardItem header>
            <Text>This is your public key in form of a QR Code</Text>
          </CardItem>
        </Card>
      </Content>
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
