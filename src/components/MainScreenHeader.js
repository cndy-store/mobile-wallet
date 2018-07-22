import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import { asset } from '../lib/stellar';
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

import HeaderTitleWithBalance from './HeaderTitleWithBalance';

export class MainScreenHeader extends Component {
  constructor(props) {
    super(props);

    this.openDrawer = this.openDrawer.bind(this);
  }

  openDrawer() {
    this.props.navigation.navigate('DrawerOpen');
  }

  render() {
    return (
      <Header hasTabs={this.props.hasTabs}>
        <Left>
          <Button transparent onPress={this.openDrawer}>
            <Icon name="menu" />
          </Button>
        </Left>
        <Body style={{ flex: 2 }}>
          <HeaderTitleWithBalance />
        </Body>
        <Right />
      </Header>
    );
  }
}

MainScreenHeader.defaultProps = {
  hasTabs: true
};

export default withNavigation(MainScreenHeader);
