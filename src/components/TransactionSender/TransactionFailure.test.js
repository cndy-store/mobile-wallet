import React from 'react';
import renderer from 'react-test-renderer';
import { Button } from 'react-native';
import TransactionFailure from './TransactionFailure';

it('renders correctly without an error', () => {
  const onAcknowledge = jest.fn();
  const tree = renderer
    .create(<TransactionFailure onAcknowledge={onAcknowledge} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('calls onAcknowledge when button is pressed', () => {
  const onAcknowledge = jest.fn();

  const instance = renderer.create(
    <TransactionFailure onAcknowledge={onAcknowledge} />
  ).root;

  instance.findByType(Button).props.onPress();
  expect(onAcknowledge).toHaveBeenCalled();
});
