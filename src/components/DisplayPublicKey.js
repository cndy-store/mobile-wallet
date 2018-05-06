import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { chunk } from 'lodash';
import { View, Button, StyleSheet, Text, Platform } from 'react-native';

const pairsPerRow = 4;

const needsBold = index => index % 2 === 0;
const needsNewLine = index => index === pairsPerRow - 1;

const fontFamily = Platform.OS === 'ios' ? 'Courier' : 'monospace';

class DisplayPublicKey extends Component {
  pairsToText(pairs) {
    return pairs.map((pair, index) => {
      const key = `${pair}-${index}`;
      const style = needsBold(index) ? styles.bold : styles.normal;
      const newLine = needsNewLine(index) ? '\n' : '';

      return (
        <Text key={key} style={style}>
          {pair}
          {newLine}
        </Text>
      );
    });
  }

  keyParts() {
    const chars = this.props.publicKey.split('');
    const pairs = chunk(chars, 2).map(pair => pair.join(''));
    const perRow = chunk(pairs, 4);

    return perRow.map((pairs, index) => {
      return this.pairsToText(pairs);
    });
  }

  render() {
    return (
      <View style={{ alignSelf: 'center' }}>
        <Text numberOfLines={7} style={styles.publicKey}>
          {this.keyParts()}
        </Text>
      </View>
    );
  }
}

DisplayPublicKey.propTypes = {
  publicKey: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  publicKey: {
    fontSize: 24
  },
  normal: {
    fontFamily,
    letterSpacing: 5,
    fontSize: 30
  },
  bold: {
    fontFamily,
    letterSpacing: 5,
    fontSize: 30,
    fontWeight: 'bold'
  }
});

export default DisplayPublicKey;
