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
  Right,
  Body,
  Title,
  Content,
  Tab,
  Tabs
} from 'native-base';
import moment from 'moment';
import { styles as s } from 'react-native-style-tachyons';
import { color } from '../styles/colors';
import ShortenedPublicKey from './ShortenedPublicKey';

const captions = {
  credit: 'From',
  debit: 'To'
};

const amountColors = {
  credit: color.credit,
  debit: color.debit
};

class PaymentListItem extends React.Component {
  static propTypes = {
    type: PropTypes.oneOf(['credit', 'debit']),
    publicKey: PropTypes.string.isRequired,
    amount: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired
  };

  render() {
    const amountColor = amountColors[this.props.type];
    const timeString = moment(this.props.createdAt).format(
      'MMM Do YYYY, HH:mm'
    );

    return (
      <Card>
        <CardItem>
          <Left />
          <Right>
            <Text note>{timeString}</Text>
          </Right>
        </CardItem>
        <CardItem>
          <Body>
            <Text>{captions[this.props.type]}</Text>
            <ShortenedPublicKey publicKey={this.props.publicKey} />
          </Body>
        </CardItem>
        <CardItem>
          <H1 style={[s.flx_i, s.tr, s.ass, amountColor]}>
            {this.props.amount}
          </H1>
        </CardItem>
      </Card>
    );
  }
}

export default PaymentListItem;
