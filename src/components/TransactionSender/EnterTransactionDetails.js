import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StatusBar, StyleSheet, View } from 'react-native';
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
import Dimensions from 'Dimensions';
import ShortenedPublicKey from '../../components/ShortenedPublicKey';
import FormError from '../../components/FormError';
import { sanitizeOngoingAmountInput } from '../../lib/formatter';

const { width, height } = Dimensions.get('window');

class EnterTransactionDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amountInput: ''
    };

    this.updateAmount = this.updateAmount.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateAmount(amountInput) {
    this.setState({ amountInput: sanitizeOngoingAmountInput(amountInput) });
  }

  handleSubmit() {
    this.props.onSubmit({ amountInput: this.state.amountInput });
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
            <Text>Enter Amount to Transfer</Text>
          </CardItem>
          <CardItem />
          <CardItem>
            <Text>Receiver</Text>
          </CardItem>
          <CardItem>
            <ShortenedPublicKey publicKey={this.props.receiver} />
          </CardItem>
          <CardItem>
            <View style={{ flex: 1 }}>
              <Form>
                <Item stackedLabel error={!!this.state.error}>
                  <Label>Amount</Label>
                  <Input
                    autoFocus={true}
                    style={{ fontSize: 27 }}
                    value={this.state.amountInput}
                    autoCorrect={false}
                    keyboardType={'numeric'}
                    onChangeText={this.updateAmount}
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

EnterTransactionDetails.propTypes = {
  receiver: PropTypes.string.isRequired,
  error: PropTypes.string,
  onSubmit: PropTypes.func.isRequired
};

export default EnterTransactionDetails;
