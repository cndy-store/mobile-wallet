import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';

import {
  Button,
  Text,
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
import { removeKeypair } from '../actions/keypair';

import MainScreenHeader from '../components/MainScreenHeader';

class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.handleDeleteSecret = this.handleDeleteSecret.bind(this);
  }

  handleDeleteSecret() {
    this.props.removeKeypair().then(() => {
      this.props.navigation.navigate('Welcome');
    });
  }

  renderError() {
    if (!this.props.error) return null;

    return (
      <View>
        <Text>{this.props.error}</Text>
      </View>
    );
  }

  render() {
    const buttonTitle = this.props.inProgress ? 'Deleting...' : 'Delete';

    return (
      <Container>
        <MainScreenHeader hasTabs={false} />
        <Content padded>
          <View>
            <Text>Click here to delete secret</Text>

            <Button
              disabled={this.props.inProgress}
              onPress={this.handleDeleteSecret}
            >
              <Text>{buttonTitle}</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    inProgress: state.keypair.inProgress,
    error: state.keypair.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeKeypair: () => dispatch(removeKeypair())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
