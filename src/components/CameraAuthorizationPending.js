import React, { Component, PropTypes } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';

export default class CameraAuthorizationPending extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <ActivityIndicator size="small" />
      </View>
    );
  }
}
