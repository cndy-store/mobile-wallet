import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';

import { Container, Row } from '../components/layout';

export default class WelcomeScreen extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Text>YoLo</Text>
        </Row>
        <Row />

        <Row>
          <Button
            color="#ff0000"
            title={'Manually enter Secret'}
            onPress={() => this.props.navigation.navigate('EnterSecret')}
          />
        </Row>
      </Container>
    );
  }
}
