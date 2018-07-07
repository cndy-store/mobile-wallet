import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
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

import animationSource from '../../../assets/lottie/checked_done_.json';

const animationSize = 200;

class TransactionSuccess extends Component {
  constructor(props) {
    super(props);

    this.handleAcknowledge = this.handleAcknowledge.bind(this);
  }

  componentDidMount() {
    this.animation.play();
  }

  handleAcknowledge() {
    this.props.onAcknowledge();
  }

  render() {
    return (
      <View>
        <Card>
          <CardItem header>
            <Text>Transaction was Successful!</Text>
          </CardItem>
          <CardItem>
            <View style={[styles.animationContainer]}>
              <View style={[styles.lottieWrapper]}>
                <LottieView
                  style={[styles.lottieAnimation]}
                  ref={animation => {
                    this.animation = animation;
                  }}
                  loop={false}
                  source={animationSource}
                />
              </View>
            </View>
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
              <Button block success onPress={this.handleAcknowledge}>
                <Text>Done</Text>
              </Button>
            </Body>
          </CardItem>
        </Card>
      </View>
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
    width: '100%',
    height: animationSize
  },
  lottieAnimation: {
    height: animationSize
  }
});

TransactionSuccess.propTypes = {
  receiver: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  onAcknowledge: PropTypes.func.isRequired
};

export default TransactionSuccess;
