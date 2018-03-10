import React from 'react';
import { Button, View, TextInput } from 'react-native';

import { Container, Row } from '../components/layout';

export default class EnterSecretScreen extends React.Component {
  render() {
    return (
      <Container>
        <Row>
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
              value={'SBNJI3RT2XWRSBTKKYQ6EONG5SVBPQMI62M5YXBFCELNVYFUFAQDW25F'}
            />
          </View>
          <Button
            title={'Save'}
            onPress={() => this.props.navigation.navigate('EnterSecret')}
          />
        </Row>
      </Container>
    );
  }
}
