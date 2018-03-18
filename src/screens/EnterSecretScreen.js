import React from 'react';
import { connect } from 'react-redux';
import { Button, Text, View, TextInput } from 'react-native';

import { Container, Row } from '../components/layout';
import { saveKeypair } from '../actions/keypair';

class EnterSecretScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secret: ''
    };

    this.handleTextInput = this.handleTextInput.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleTextInput(text) {
    this.setState({ secret: text });
  }

  handleSave() {
    this.props.saveKeypair(this.state.secret).then(() => {
      this.props.navigation.navigate('Main');
    });
  }

  renderError() {
    if (!this.props.error) return null;

    return (
      <View>
        <Text>{this.props.error.message}</Text>
      </View>
    );
  }

  render() {
    const buttonTitle = this.props.secretKeyIsSaving ? 'Saving...' : 'Save';

    return (
      <Container>
        <Row>
          {this.renderError()}
          <View
            style={{
              borderColor: '#000000',
              borderWidth: 1
            }}
          >
            <TextInput
              multiline={true}
              numberOfLines={4}
              editable={true}
              maxLength={80}
              value={this.state.secret}
              onChangeText={this.handleTextInput}
            />
          </View>
          <Button
            disabled={this.props.inProgress}
            title={buttonTitle}
            onPress={this.handleSave}
          />
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
    saveKeypair: secret => dispatch(saveKeypair(secret))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EnterSecretScreen);
