import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {
  Button,
  Icon,
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
import Modal from 'react-native-modal';

import MainScreenHeader from '../components/MainScreenHeader';
import Send from '../components/Send';
import Receive from '../components/Receive';

export class MainScreen extends Component {
  render() {
    return (
      <Container>
        <MainScreenHeader />
        <Tabs initialPage={0}>
          <Tab heading="Send">
            <Send />
          </Tab>
          <Tab heading="Receive">
            <Receive />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

MainScreen.propTypes = {};

export default MainScreen;
