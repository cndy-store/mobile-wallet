import React from 'react';
import renderer from 'react-test-renderer';
import { Button, TextInput } from 'react-native';
import { publicKey } from '../../__tests__/fixtures/keypair';
import EnterTransactionDetails from './EnterTransactionDetails';

it('renders correctly without an error', () => {
  const onSubmit = jest.fn();

  const tree = renderer
    .create(
      <EnterTransactionDetails
        receiver={publicKey}
        error={null}
        onSubmit={onSubmit}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('calls onSubmit with entered amount', () => {
  const onSubmit = jest.fn();

  const instance = renderer.create(
    <EnterTransactionDetails
      receiver={publicKey}
      error={null}
      onSubmit={onSubmit}
    />
  ).root;

  const input = instance.findByType(TextInput);
  input.props.onChangeText('123');

  instance.findByType(Button).props.onPress();
  expect(onSubmit).toHaveBeenCalledWith({ amountInput: '123' });
});

it('renders correctly with an error', () => {
  const onSubmit = jest.fn();

  const tree = renderer
    .create(
      <EnterTransactionDetails
        receiver={publicKey}
        error={'With an error'}
        onSubmit={onSubmit}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
