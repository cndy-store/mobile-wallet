import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Text,
  Icon,
  H1,
  Card,
  CardItem,
  Container,
  Header,
  Left,
  ListItem,
  Right,
  Body,
  Title,
  Content,
  Tab,
  Tabs,
  View
} from 'native-base';
import { styles as s } from 'react-native-style-tachyons';
import ShortenedPublicKey from './ShortenedPublicKey';
import { shortFormat } from '../lib/formatter';

const captions = {
  credit: 'From',
  debit: 'To'
};

const amountPrefixes = {
  credit: '+',
  debit: '-'
};

class PaymentListItem extends React.Component {
  static propTypes = {
    type: PropTypes.oneOf(['credit', 'debit']),
    publicKey: PropTypes.string.isRequired,
    amount: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired
  };

  render() {
    const prefix = amountPrefixes[this.props.type];

    return (
      <ListItem>
        <Left>
          <View>
            <H1>
              {prefix}
              {shortFormat(this.props.amount)}
            </H1>
            <Text note>{this.props.createdAt}</Text>
          </View>
        </Left>
        <Right />
      </ListItem>
    );
  }
}

export default PaymentListItem;
