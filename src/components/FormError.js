import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'native-base';

class FormError extends React.Component {
  static propTypes = {
    message: PropTypes.string.isRequired
  };

  render() {
    return <Text>{this.props.message}</Text>;
  }
}

export default FormError;
