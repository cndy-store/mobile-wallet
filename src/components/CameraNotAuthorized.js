import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class CameraNotAuthorized extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ff0000'
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            fontSize: 16
          }}
        >
          Camera not authorized!
        </Text>
      </View>
    );
  }
}
