import React from 'react';
import { View, StyleSheet } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
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
  Title,
  H1
} from 'native-base';

import { isValidSecret } from '../lib/keypairHelpers';
import modalStyle from '../styles/modal';
import FormError from '../components/FormError';
import HeaderCancelButton from '../components/HeaderCancelButton';

export class UnseenPaymentModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secret: ''
    };

    this.handleCancel = this.handleCancel.bind(this);
  }

  handleCancel() {
    this.props.onCancel();
  }

  render() {
    return (
      <Container style={modalStyle.container}>
        <Header>
          <Left>
            <HeaderCancelButton onCancel={this.handleCancel} />
          </Left>
          <Body>
            <Title>Got CNDY!</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <View>
            <H1>{this.props.payment.amount}</H1>
          </View>
          <View style={[s.mt2]}>
            <Button block onPress={this.handleCancel}>
              <Text>Thanks!</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

export default UnseenPaymentModal;
