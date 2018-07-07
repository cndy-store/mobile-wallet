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
import LottieView from 'lottie-react-native';

import { isValidSecret } from '../lib/keypairHelpers';
import { shortFormat } from '../lib/formatter';
import modalStyle from '../styles/modal';
import FormError from '../components/FormError';
import HeaderCancelButton from '../components/HeaderCancelButton';

import animationSource from '../../assets/lottie/confetti.json';

const animationSize = 300;

export class UnseenPaymentModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secret: ''
    };

    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    this.animation.play();
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
          <View style={[styles.animationContainer]}>
            <View style={[styles.lottieWrapper]}>
              <LottieView
                style={[styles.lottieAnimation]}
                ref={animation => {
                  this.animation = animation;
                }}
                source={animationSource}
              />
            </View>
            <View style={[styles.overAnimationTextWrapper]}>
              <H1>You just got</H1>
              <H1 adjustsFontSizeToFit style={[styles.overAnimationTextHuge]}>
                {shortFormat(this.props.payment.amount)}
              </H1>
              <H1 style={[s.b]}>CNDY</H1>
            </View>
          </View>
          <View style={[s.mt4]}>
            <Text>
              Sent to you from the public key
              <Text style={[s.b]}>{' ' + this.props.payment.from}</Text>
            </Text>
          </View>
          <View style={[s.mt4]}>
            <Button block onPress={this.handleCancel}>
              <Text>Thanks!</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  animationContainer: {
    flex: 1,
    width: '100%',
    height: animationSize,
    justifyContent: 'center',
    alignItems: 'center'
  },
  lottieWrapper: {
    flex: 1,
    width: animationSize,
    height: animationSize
  },
  lottieAnimation: {
    height: animationSize
  },
  overAnimationTextWrapper: {
    flex: 1,
    width: animationSize,
    height: animationSize,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },
  overAnimationTextHuge: {
    textAlign: 'center',
    width: animationSize,
    fontWeight: 'bold',
    fontSize: 50,
    lineHeight: 60,
    textShadowColor: '#FFFFFF',
    textShadowOffset: { width: 4, height: 8 },
    textShadowRadius: 10
  }
});

export default UnseenPaymentModal;
