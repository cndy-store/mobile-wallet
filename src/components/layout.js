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
    const style = StyleSheet.flatten([styles.container, this.props.style]);
    return <View style={style} {...this.props} />;
  }
}

class Row extends Component {
  render() {
    const style = StyleSheet.flatten([styles.row, this.props.style]);
    return <View style={style} {...this.props} />;
  }
}

export { Container, Row };
