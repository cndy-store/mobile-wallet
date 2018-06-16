import React from 'react';
import PropTypes from 'prop-types';
import { Platform } from 'react-native';
import { Icon, Button, Text } from 'native-base';

class HeaderCancelButton extends React.Component {
  static propTypes = {
    onCancel: PropTypes.func.isRequired,
    icon: PropTypes.string,
    text: PropTypes.string
  };

  static defaultProps = {
    icon: 'arrow-back',
    text: 'Cancel'
  };

  getPlatform() {
    return Platform.OS;
  }

  renderIOS() {
    return (
      <Button transparent onPress={this.props.onCancel}>
        <Text>{this.props.text}</Text>
      </Button>
    );
  }

  renderAndroid() {
    return (
      <Button transparent onPress={this.props.onCancel}>

        <Icon name={this.props.icon} />
      </Button>
    );
  }

  render() {
    if (this.getPlatform() === 'ios') {
      return this.renderIOS();
    }
    return this.renderAndroid();
  }
}

export default HeaderCancelButton;
