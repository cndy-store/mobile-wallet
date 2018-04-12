import React from 'react';
import { render } from '../../__tests__/renderer';
import { Button, TextInput } from 'react-native';
import { publicKey } from '../../__tests__/fixtures/keypair';
import EnterTransactionReceiver from './EnterTransactionReceiver';

const onSubmit = jest.fn();

it('renders correctly without an error', () => {
  const { toJSON } = render(
    <EnterTransactionReceiver error={null} onSubmit={onSubmit} />
  );
  expect(toJSON()).toMatchSnapshot();
});

it('calls onSubmit with entered public key', () => {
  const { root } = render(
    <EnterTransactionReceiver error={null} onSubmit={onSubmit} />
  );

  const input = root.findByType(TextInput);
  input.props.onChangeText(publicKey);

  root.findByType(Button).props.onPress();
  expect(onSubmit).toHaveBeenCalledWith({ receiverInput: publicKey });
});

it('renders correctly with an error', () => {
  const { toJSON } = render(
    <EnterTransactionReceiver
      receiver={publicKey}
      error={'With an error'}
      onSubmit={onSubmit}
    />
  );
  expect(toJSON()).toMatchSnapshot();
});
