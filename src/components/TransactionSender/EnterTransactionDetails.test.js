import React from 'react';
import { render } from '../../__tests__/renderer';
import { Button, TextInput } from 'react-native';
import { publicKey } from '../../__tests__/fixtures/keypair';
import EnterTransactionDetails from './EnterTransactionDetails';

it('renders correctly without an error', () => {
  const onSubmit = jest.fn();

  const { toJSON } = render(
    <EnterTransactionDetails
      receiver={publicKey}
      error={null}
      onSubmit={onSubmit}
    />
  );
  expect(toJSON()).toMatchSnapshot();
});

it('calls onSubmit with entered amount', () => {
  const onSubmit = jest.fn();

  const { root } = render(
    <EnterTransactionDetails
      receiver={publicKey}
      error={null}
      onSubmit={onSubmit}
    />
  );

  const input = root.findByType(TextInput);
  input.props.onChangeText('123');

  root.findByType(Button).props.onPress();
  expect(onSubmit).toHaveBeenCalledWith({ amountInput: '123' });
});

it('renders correctly with an error', () => {
  const onSubmit = jest.fn();

  const { toJSON } = render(
    <EnterTransactionDetails
      receiver={publicKey}
      error={'With an error'}
      onSubmit={onSubmit}
    />
  );
  expect(toJSON()).toMatchSnapshot();
});
