import React from 'react';
import { render } from '../../__tests__/renderer';
import { Button } from 'react-native';
import { publicKey } from '../../__tests__/fixtures/keypair';
import ConfirmTransactionDetails from './ConfirmTransactionDetails';

it('renders correctly without an error', () => {
  const onConfirm = jest.fn();
  const onReject = jest.fn();

  const { toJSON } = render(
    <ConfirmTransactionDetails
      receiver={publicKey}
      amount={'12.34'}
      onConfirm={onConfirm}
      onReject={onReject}
    />
  );
  expect(toJSON()).toMatchSnapshot();
});

it('calls the onConfirm prop if confirm button is pressed', () => {
  const onConfirm = jest.fn();
  const onReject = jest.fn();

  const { root, instance } = render(
    <ConfirmTransactionDetails
      receiver={publicKey}
      amount={'12.34'}
      onConfirm={onConfirm}
      onReject={onReject}
    />
  );

  root.findByProps({ onPress: instance.handleConfirm }).props.onPress();
  expect(onConfirm).toHaveBeenCalled();
});

it('calls the onConfirm prop if reject button is pressed', () => {
  const onConfirm = jest.fn();
  const onReject = jest.fn();

  const { root, instance } = render(
    <ConfirmTransactionDetails
      receiver={publicKey}
      amount={'12.34'}
      onConfirm={onConfirm}
      onReject={onReject}
    />
  );

  root.findByProps({ onPress: instance.handleReject }).props.onPress();
  expect(onReject).toHaveBeenCalled();
});
