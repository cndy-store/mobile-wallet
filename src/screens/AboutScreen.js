import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Image, Linking, View, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';
import {
  Icon,
  Body,
  Container,
  Header,
  Left,
  Right,
  List,
  ListItem,
  Content,
  Button,
  Text,
  Title
} from 'native-base';
import MainScreenHeader from '../components/MainScreenHeader';

const openURL = url => Linking.openURL(url);

export class AboutScreen extends Component {
  renderLinkedListItem(text, url) {
    return (
      <ListItem button onPress={() => openURL(url)}>
        <Left>
          <Text>{text}</Text>
        </Left>
        <Right>
          <Icon name="open" />
        </Right>
      </ListItem>
    );
  }

  render() {
    return (
      <Container>
        <MainScreenHeader hasTabs={false} />
        <Content>
          <List>
            <ListItem itemDivider>
              <Text>About this app</Text>
            </ListItem>
            {this.renderLinkedListItem(
              'Official CNDY Homepage',
              'https://cndy.store'
            )}
            {this.renderLinkedListItem(
              'Contact/Imprint',
              'https://www.iubenda.com/privacy-policy/63674794'
            )}

            {this.renderLinkedListItem(
              'Data Protection Policy',
              'https://www.iubenda.com/privacy-policy/63674794'
            )}

            <ListItem itemDivider>
              <Text>Acknowledgments</Text>
            </ListItem>

            {this.renderLinkedListItem(
              'Food icons in the payment progress animations were created by Salinee Pimpakun.',
              'https://www.shareicon.net/author/salinee-pimpakun'
            )}
          </List>
        </Content>
      </Container>
    );
  }
}
export default AboutScreen;
