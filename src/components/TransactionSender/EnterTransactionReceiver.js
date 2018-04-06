import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TextInput
} from 'react-native';
import Dimensions from 'Dimensions';

const { width, height } = Dimensions.get('window');

class EnterTransactionReceiver extends Component {
  constructor(props) {
    super(props);

    this.state = {
      receiverInput: ''
    };

    this.updateReceiver = this.updateReceiver.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateReceiver(receiverInput) {
    this.setState({ receiverInput });
  }

  handleSubmit() {
    this.props.onSubmit({ receiverInput: this.state.receiverInput });
  }

  renderError() {
    if (!this.props.error) return null;

    return <Text>{this.props.error}</Text>;
  }

  render() {
    return (
      <View>
        <Text>Please enter Public Key of Receiver</Text>
        <TextInput
          style={{
            width,
            height: 40,
            borderColor: 'gray',
            borderWidth: 1
          }}
          value={this.state.receiverInput}
          autoCorrect={false}
          onChangeText={this.updateReceiver}
        />
        <Button title="Next" onPress={this.handleSubmit} />
        {this.renderError()}
      </View>
    );
  }
}

const styles = StyleSheet.create({});

EnterTransactionReceiver.propTypes = {
  error: PropTypes.string,
  onSubmit: PropTypes.func.isRequired
};

export default EnterTransactionReceiver;
