import React from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Camera from 'react-native-camera';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center'
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.camera = null;

    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar animated hidden />
        <Camera
          ref={cam => {
            this.camera = cam;
          }}
          style={styles.preview}
          type={Camera.constants.Type.back}
          flashMode={Camera.constants.FlashMode.off}
          barCodeTypes={[Camera.constants.BarCodeType.qr]}
          onBarCodeRead={e => {
            console.warn(e.data);
            console.warn(e.type);
          }}
          permissionDialogTitle="Sample title"
          permissionDialogMessage="Sample dialog message"
        />
        <View style={[styles.overlay, styles.topOverlay]}>
          <Text>Scan a QR Code</Text>
        </View>
        <View style={[styles.overlay, styles.bottomOverlay]}>
          <Text>Bottom</Text>
        </View>
      </View>
    );
  }
}
