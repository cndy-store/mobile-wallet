import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { H1 } from 'native-base';

class ShortenedPublicKey extends Component {
  render() {
    return (
      <H1 ellipsizeMode="middle" numberOfLines={1}>
        {this.props.publicKey}
      </H1>
    );
  }
}

ShortenedPublicKey.propTypes = {
  publicKey: PropTypes.string.isRequired
};

export default ShortenedPublicKey;
