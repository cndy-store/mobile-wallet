import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StatusBar, View } from 'react-native';
import {
  Icon,
  H1,
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
import ShortenedPublicKey from '../../components/ShortenedPublicKey';

class TransactionFailure extends Component {
  constructor(props) {
    super(props);

    this.handleAcknowledge = this.handleAcknowledge.bind(this);
  }

  handleAcknowledge() {
    this.props.onAcknowledge();
  }

  render() {
    return (
      <View>
        <Card>
          <CardItem header>
            <Text>Transaction Failed!</Text>
          </CardItem>
          <CardItem>
            <Text>
              The transaction could not be completed, please check your
              transaction logs to make sure it took place or retry later.
            </Text>
            <Text>Reason: {this.props.error}</Text>
          </CardItem>
          <CardItem>
            <Text>Receiver</Text>
          </CardItem>
          <CardItem>
            <ShortenedPublicKey publicKey={this.props.receiver} />
          </CardItem>
          <CardItem>
            <Text>Amount</Text>
          </CardItem>
          <CardItem>
            <H1>{this.props.amount}</H1>
          </CardItem>
          <CardItem>
            <Body>
              <Button block danger onPress={this.handleAcknowledge}>
                <Text>Done</Text>
              </Button>
            </Body>
          </CardItem>
        </Card>
      </View>
    );
  }
}

TransactionFailure.propTypes = {
  onAcknowledge: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired
};

export default TransactionFailure;
