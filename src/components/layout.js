import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20
  },
  row: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

class Container extends Component {
  render() {
    return <View style={styles.container} {...this.props} />;
  }
}

class Row extends Component {
  render() {
    return <View style={styles.row} {...this.props} />;
  }
}

export { Container, Row };
