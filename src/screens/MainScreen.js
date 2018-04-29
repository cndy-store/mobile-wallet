import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
  Toast,
  Tab,
  Tabs
} from 'native-base';
import Modal from 'react-native-modal';

import { loadAccount } from '../actions/account';
import MainScreenHeader from '../components/MainScreenHeader';
import Send from '../components/Send';
import Receive from '../components/Receive';

export class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.loadAccount();
  }

  loadAccount = async () => {
    this.props.loadAccount(this.props.keypair.publicKey()).catch(e => {
      Toast.show({
        text: 'Could not load account data. Please check internet connection.'
      });
    });
  };

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

MainScreen.propTypes = {
  keypair: PropTypes.object.isRequired,
  loadAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  keypair: state.keypair.keypair
});

const mapDispatchToProps = dispatch => ({
  loadAccount: publicKey => dispatch(loadAccount(publicKey))
});

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
