import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, StyleSheet, Text } from 'react-native';

class ShortenedPublicKey extends Component {
  render() {
    return (
      <Text ellipsizeMode="middle" numberOfLines={1} style={styles.publicKey}>
        {this.props.publicKey}
      </Text>
    );
  }
}

ShortenedPublicKey.propTypes = {
  publicKey: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  publicKey: {
    fontSize: 24
  }
});

export default ShortenedPublicKey;
