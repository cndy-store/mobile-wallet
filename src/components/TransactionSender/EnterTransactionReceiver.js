import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StatusBar, View } from 'react-native';
import {
  Icon,
  Body,
  Card,
  CardItem,
  Container,
  Form,
  Input,
  Label,
  Header,
  Item,
  Left,
  Right,
  Content,
  Button,
  Text,
  Title
} from 'native-base';
import { styles as s } from 'react-native-style-tachyons';
import FormError from '../../components/FormError';
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

    return <FormError message={this.props.error} />;
  }

  render() {
    return (
      <View>
        <Card>
          <CardItem header>
            <Text>Enter Public Key of Receiver</Text>
          </CardItem>
          <CardItem>
            <View style={{ flex: 1 }}>
              <Form>
                <Item stackedLabel error={!!this.state.error}>
                  <Label>Receiver</Label>
                  <Input
                    autoFocus
                    value={this.state.receiverInput}
                    autoCorrect={false}
                    onChangeText={this.updateReceiver}
                  />
                </Item>
                {this.renderError()}
              </Form>
            </View>
          </CardItem>
          <CardItem>
            <Body>
              <Button block onPress={this.handleSubmit}>
                <Text>Next</Text>
              </Button>
            </Body>
          </CardItem>
        </Card>
      </View>
    );
  }
}

EnterTransactionReceiver.propTypes = {
  error: PropTypes.string,
  onSubmit: PropTypes.func.isRequired
};

export default EnterTransactionReceiver;
