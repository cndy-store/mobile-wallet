import React from 'react';
import { connect } from 'react-redux';
import { Button, Text, View, TextInput } from 'react-native';
import { Container, Row } from '../components/layout';
import { deleteSecretKey } from '../actions/secretKey';

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
    this.props.deleteSecretKey().then(() => {
      this.props.navigation.navigate('Welcome');
    });
  }

  renderError() {
    if (!this.props.secretKeySaveError) return null;

    return (
      <View>
        <Text>{this.props.secretKeySaveError}</Text>
      </View>
    );
  }

  render() {
    const buttonTitle = this.props.secretKeyIsSaving ? 'Deleting...' : 'Delete';

    return (
      <Container>
        <Row>
          <View>
            <Text>Click here to delete secret</Text>

            <Button
              disabled={this.props.secretKeyIsSaving}
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
    secretKeyIsSaving: state.secretKeyIsSaving,
    secretKeySaveError: state.secretKeySaveError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteSecretKey: () => dispatch(deleteSecretKey())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
