import React from 'react';
import { connect } from 'react-redux';
import { Alert, Clipboard, View } from 'react-native';
import Modal from 'react-native-modal';
import {
  Button,
  Text,
  Icon,
  Card,
  CardItem,
  Container,
  Header,
  Left,
  Right,
  Body,
  Title,
  Content,
  Tab,
  Tabs,
  Toast
} from 'native-base';
import { removeKeypair } from '../actions/keypair';
import modalStyle from '../styles/modal';
import MainScreenHeader from '../components/MainScreenHeader';
import DisplayPublicKey from '../components/DisplayPublicKey';
import HeaderCancelButton from '../components/HeaderCancelButton';

class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false
    };

    this.copySecretToClipboard = this.copySecretToClipboard.bind(this);
    this.handleShowSecret = this.handleShowSecret.bind(this);
    this.handleDeleteSecret = this.handleDeleteSecret.bind(this);
    this.deleteKeypair = this.deleteKeypair.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  copySecretToClipboard() {
    const secret = this.props.keypair.secret();
    Clipboard.setString(`Your CNDY secret: ${secret} (NEVER SHARE IT!)`);

    Toast.show({
      text: 'Secret copied to clipboard',
      buttonText: 'Okay',
      duration: 3000
    });
  }

  handleShowSecret() {
    this.setState({
      isModalVisible: true
    });
  }

  handleCloseModal() {
    this.setState({
      isModalVisible: false
    });
  }

  handleDeleteSecret() {
    Alert.alert(
      'Are you REALLY sure?',
      'You need a backup, otherwise you will lose access to your CNDY!',
      [
        {
          text: 'Abort',
          onPress: () => {},
          style: 'cancel'
        },

        { text: 'Yes, I am 100% sure', onPress: this.deleteKeypair }
      ],
      { cancelable: false }
    );
  }

  deleteKeypair() {
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
        <Content padder>
          <Card>
            <CardItem header>
              <Text>Show Secret</Text>
            </CardItem>
            <CardItem>
              <Text>
                Everyone that knows your secret is able to spend your CNDY.
                Please be careful! For your eyes only!
              </Text>
            </CardItem>
            <CardItem>
              <Body>
                <Button block onPress={this.handleShowSecret}>
                  <Text>Show secret</Text>
                </Button>
              </Body>
            </CardItem>
          </Card>

          <Card>
            <CardItem header>
              <Text>Backup Secret</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>Make sure to backup your secret somewhere save!</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Button block bordered onPress={this.copySecretToClipboard}>
                  <Text>Copy Secret to Clipboard</Text>
                </Button>
              </Body>
            </CardItem>
          </Card>

          <Card>
            <CardItem header>
              <Text>Delete Secret</Text>
            </CardItem>
            <CardItem>
              <Text>
                If you delete your secret, you won't be able to access your CNDY
                anymore.
              </Text>
            </CardItem>
            <CardItem>
              <Body>
                <Button
                  block
                  bordered
                  disabled={this.props.inProgress}
                  onPress={this.handleDeleteSecret}
                >
                  <Text>{buttonTitle}</Text>
                </Button>
              </Body>
            </CardItem>
          </Card>
        </Content>

        <Modal
          isVisible={this.state.isModalVisible}
          onBackButtonPress={this.handleCloseModal}
          style={modalStyle.modal}
        >
          <Container style={modalStyle.container}>
            <Header>
              <Left>
                <HeaderCancelButton onCancel={this.handleCloseModal} />
              </Left>
              <Body>
                <Title>Your Secret</Title>
              </Body>
              <Right />
            </Header>
            <Content padder>
              <DisplayPublicKey publicKey={this.props.keypair.secret()} />
              <Text>
                This is your secret. Do not show it to anyone else! Anyone that
                has your secret, can spend your CNDY and they will be gone
                forever!
              </Text>
              <Text>
                Your secret consists of 56 characters, read them from left to
                right, line by line. You can restore your CNDY on another device
                by entering the secret by hand.
              </Text>
            </Content>
          </Container>
        </Modal>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  keypair: state.keypair.keypair,
  inProgress: state.keypair.inProgress,
  error: state.keypair.error
});

const mapDispatchToProps = dispatch => ({
  removeKeypair: () => dispatch(removeKeypair())
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
