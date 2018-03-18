import React from 'react';
import { connect } from 'react-redux';
import { Button, Text, View, TextInput } from 'react-native';
import { Container, Row } from '../components/layout';
import { removeKeypair } from '../actions/keypair';

class SettingsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      headerTitle: 'Settings'
    };
  };

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
        <Row>
          <View>
            <Text>Click here to delete secret</Text>

            <Button
              disabled={this.props.inProgress}
              title={buttonTitle}
              onPress={this.handleDeleteSecret}
            />
          </View>
        </Row>
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
