import React from 'react';
import renderer from 'react-test-renderer';
import { Button, TextInput } from 'react-native';
import { publicKey } from '../../__tests__/fixtures/keypair';
import EnterTransactionReceiver from './EnterTransactionReceiver';

it('renders correctly without an error', () => {
  const onSubmit = jest.fn();

  const tree = renderer
    .create(<EnterTransactionReceiver error={null} onSubmit={onSubmit} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('calls onSubmit with entered public key', () => {
  const onSubmit = jest.fn();

  const instance = renderer.create(
    <EnterTransactionReceiver error={null} onSubmit={onSubmit} />
  ).root;

  const input = instance.findByType(TextInput);
  input.props.onChangeText(publicKey);

  instance.findByType(Button).props.onPress();
  expect(onSubmit).toHaveBeenCalledWith({ receiverInput: publicKey });
});

it('renders correctly with an error', () => {
  const onSubmit = jest.fn();

  const tree = renderer
    .create(
      <EnterTransactionReceiver
        receiver={publicKey}
        error={'With an error'}
        onSubmit={onSubmit}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
