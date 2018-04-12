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

  const { root } = render(
    <ConfirmTransactionDetails
      receiver={publicKey}
      amount={'12.34'}
      onConfirm={onConfirm}
      onReject={onReject}
    />
  );

  root.findByProps({ title: 'Confirm!' }).props.onPress();
  expect(onConfirm).toHaveBeenCalled();
});

it('calls the onConfirm prop if reject button is pressed', () => {
  const onConfirm = jest.fn();
  const onReject = jest.fn();

  const { root } = render(
    <ConfirmTransactionDetails
      receiver={publicKey}
      amount={'12.34'}
      onConfirm={onConfirm}
      onReject={onReject}
    />
  );

  root.findByProps({ title: 'Change!' }).props.onPress();
  expect(onReject).toHaveBeenCalled();
});
