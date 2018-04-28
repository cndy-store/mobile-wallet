import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import {
  Icon,
  H1,
  Body,
  Card,
  CardItem,
  Container,
  Header,
  Left,
  Right,
  Content,
  Button,
  Text,
  Title
} from 'native-base';
import Dimensions from 'Dimensions';
import ShortenedPublicKey from '../../components/ShortenedPublicKey';
import { sanitizeOngoingAmountInput } from '../../lib/formatter';

class ConfirmTransactionDetails extends Component {
  constructor(props) {
    super(props);

    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleReject = this.handleReject.bind(this);
  }

  handleConfirm() {
    this.props.onConfirm();
  }

  handleReject() {
    this.props.onReject();
  }

  render() {
    return (
      <View>
        <Card>
          <CardItem header>
            <Text>Confirm Transaction Details</Text>
          </CardItem>
          <CardItem />
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
              <Button block onPress={this.handleConfirm}>
                <Text>Confirm</Text>
              </Button>
            </Body>
          </CardItem>
        </Card>

        <Button block transparent onPress={this.handleReject}>
          <Text>Change amount</Text>
        </Button>
      </View>
    );
  }
}

ConfirmTransactionDetails.propTypes = {
  receiver: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired
};

export default ConfirmTransactionDetails;
