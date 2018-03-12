import React from 'react';
import { connect } from 'react-redux';
import { Button, Text, View, TextInput } from 'react-native';

import { Container, Row } from '../components/layout';
import { saveSecretKey } from '../actions/secretKey';

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
    this.props.saveSecretKey(this.state.secret).then(() => {
      this.props.navigation.navigate('Main');
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
            disabled={this.props.secretKeyIsSaving}
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
    secretKeyIsSaving: state.secretKeyIsSaving,
    secretKeySaveError: state.secretKeySaveError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveSecretKey: secretKey => dispatch(saveSecretKey(secretKey))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EnterSecretScreen);
