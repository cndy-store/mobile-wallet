import React from 'react';
import { View, StyleSheet } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import {
  Icon,
  Body,
  Card,
  CardItem,
  Container,
  Form,
  Input,
  Label,
  Header,
  Item,
  Left,
  Right,
  Content,
  Button,
  Text,
  Title
} from 'native-base';

import { isValidSecret } from '../lib/keypairHelpers';
import modalStyle from '../styles/modal';
import FormError from '../components/FormError';
import HeaderCancelButton from '../components/HeaderCancelButton';

export class EnterSecretModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secret: ''
    };

    this.handleCancel = this.handleCancel.bind(this);
    this.handleTextInput = this.handleTextInput.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleCancel() {
    this.props.onCancel();
  }

  handleTextInput(text) {
    this.setState({ secret: text });
  }

  handleSave() {
    const isValid = isValidSecret(this.state.secret);

    if (isValid) {
      this.props.onSubmit(this.state.secret);
    } else {
      this.setState({ error: 'Invalid secret' });
    }
  }

  renderError() {
    if (!this.state.error) return null;

    return (
      <View style={[s.mt2]}>
        <FormError message={this.state.error} />
      </View>
    );
  }

  render() {
    return (
      <Container style={modalStyle.container}>
        <Header>
          <Left>
            <HeaderCancelButton onCancel={this.handleCancel} />
          </Left>
          <Body>
            <Title>Enter Secret</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Form>
            <Item stackedLabel error={!!this.state.error}>
              <Label>Enter Secret</Label>
              <Input
                value={this.state.secret}
                onChangeText={this.handleTextInput}
              />
            </Item>
            {this.renderError()}
            <View style={[s.mt2]}>
              <Button block onPress={this.handleSave}>
                <Text>Save</Text>
              </Button>
            </View>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default EnterSecretModal;
