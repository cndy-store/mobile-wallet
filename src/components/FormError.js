import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Icon, Text, View } from 'native-base';
import { styles as s } from 'react-native-style-tachyons';

class FormError extends React.Component {
  static propTypes = {
    message: PropTypes.string.isRequired
  };

  render() {
    return (
      <View style={styles.container}>
        <Icon style={s.pl3} name="warning" />
        <Text style={s.pl1}>{this.props.message}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  }
});

export default FormError;
