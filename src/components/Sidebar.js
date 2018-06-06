import React from 'react';
import { AppRegistry, Image, StatusBar } from 'react-native';
import { withNavigation } from 'react-navigation';
import {
  Button,
  Text,
  Container,
  List,
  ListItem,
  Content,
  Icon
} from 'native-base';
import drawerImageBackground from '../../assets/img/drawer-image-background.png';
import drawerImageLogo from '../../assets/img/drawer-image-logo.png';

const routes = [
  { name: 'Send/Receive', route: 'Main' },
  { name: 'Payments', route: 'Payments' },
  { name: 'Settings', route: 'Settings' }
];

export class SideBar extends React.Component {
  render() {
    return (
      <Container>
        <Content>
          <Image
            source={drawerImageBackground}
            style={{
              height: 120,
              width: '100%',
              alignSelf: 'stretch',
              position: 'absolute'
            }}
          />
          <Image
            square
            style={{
              height: 80,
              width: 80,
              position: 'absolute',
              alignSelf: 'center',
              top: 20
            }}
            source={drawerImageLogo}
          />
          <List
            dataArray={routes}
            contentContainerStyle={{ marginTop: 120 }}
            renderRow={data => {
              return (
                <ListItem
                  button
                  onPress={() => this.props.navigation.navigate(data.route)}
                >
                  <Text>{data.name}</Text>
                </ListItem>
              );
            }}
          />
        </Content>
      </Container>
    );
  }
}

export default withNavigation(SideBar);
