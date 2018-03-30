import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, StatusBar, StyleSheet, View, Text } from 'react-native';
import Dimensions from 'Dimensions';
import Camera from 'react-native-camera';
import CameraNotAuthorized from '../components/CameraNotAuthorized';
import CameraAuthorizationPending from '../components/CameraAuthorizationPending';

const { width, height } = Dimensions.get('window');

export class BarCodeScanner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null
    };

    this.errorTimeout = null;
    this.handleCancel = this.handleCancel.bind(this);
    this.handleBarCodeRead = this.handleBarCodeRead.bind(this);
    // necessary to debounce the QR code callback from camera
    this.foundCode = false;
  }

  componentWillUnmount() {
    this.clearTimeouts();
  }

  clearErrors() {
    this.setState({ error: null });
  }

  clearTimeouts() {
    if (this.errorTimeout) clearTimeout(this.errorTimeout);
  }

  handleCancel() {
    this.props.onCancel();
  }

  handleBarCodeRead(e) {
    if (this.foundCode) return;

    const decoded = this.props.decoder(e.data);

    if (!decoded) {
      this.setState({ error: 'Not a valid QR code' });
      this.errorTimeout = setTimeout(() => this.clearErrors(), 1000);
    } else {
      this.foundCode = true;
      this.clearErrors();
      this.props.onCodeScan(decoded);
    }
  }

  renderCamera() {
    return (
      <Camera
        style={styles.camera}
        type={Camera.constants.Type.back}
        barCodeTypes={[Camera.constants.BarCodeType.qr]}
        onBarCodeRead={this.handleBarCodeRead}
        permissionDialogTitle="Allow Camera Access"
        permissionDialogMessage="We need it to scan QR codes"
        notAuthorizedView={<CameraNotAuthorized />}
        pendingAuthorizationView={<CameraAuthorizationPending />}
      />
    );
  }

  renderError() {
    if (!this.state.error) return null;

    return (
      <View style={[styles.overlay, styles.error]}>
        <Text>{this.state.error}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar animated hidden />
        {this.renderCamera()}
        <View style={[styles.overlay, styles.topOverlay]}>
          <Text>Scan a QR Code</Text>
        </View>
        <View style={[styles.overlay, styles.bottomOverlay]}>
          <View>
            <Button title={'Abort'} onPress={this.handleCancel} />
          </View>
        </View>
        {this.renderError()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    height
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255, 0.5)',
    padding: 16,
    right: 0,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  error: {
    left: width / 4,
    right: width / 4,
    width: width / 2,
    height: width / 2,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#ffffff',
    backgroundColor: 'rgba(255,0,0,0.4)'
  },
  topOverlay: {
    top: 0
  },
  bottomOverlay: {
    bottom: 0
  }
});

BarCodeScanner.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onCodeScan: PropTypes.func.isRequired,
  decoder: PropTypes.func.isRequired
};

export default BarCodeScanner;
