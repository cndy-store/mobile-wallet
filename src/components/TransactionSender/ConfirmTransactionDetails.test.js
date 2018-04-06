import React from 'react';
import renderer from 'react-test-renderer';
import { Button } from 'react-native';
import { publicKey } from '../../__tests__/fixtures/keypair';
import ConfirmTransactionDetails from './ConfirmTransactionDetails';

it('renders correctly without an error', () => {
  const onConfirm = jest.fn();
  const onReject = jest.fn();

  const tree = renderer
    .create(
      <ConfirmTransactionDetails
        receiver={publicKey}
        amount={'12.34'}
        onConfirm={onConfirm}
        onReject={onReject}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('calls the onConfirm prop if confirm button is pressed', () => {
  const onConfirm = jest.fn();
  const onReject = jest.fn();

  const instance = renderer.create(
    <ConfirmTransactionDetails
      receiver={publicKey}
      amount={'12.34'}
      onConfirm={onConfirm}
      onReject={onReject}
    />
  ).root;

  instance.findByProps({ title: 'Confirm!' }).props.onPress();
  expect(onConfirm).toHaveBeenCalled();
});

it('calls the onConfirm prop if reject button is pressed', () => {
  const onConfirm = jest.fn();
  const onReject = jest.fn();

  const instance = renderer.create(
    <ConfirmTransactionDetails
      receiver={publicKey}
      amount={'12.34'}
      onConfirm={onConfirm}
      onReject={onReject}
    />
  ).root;

  instance.findByProps({ title: 'Change!' }).props.onPress();
  expect(onReject).toHaveBeenCalled();
});
