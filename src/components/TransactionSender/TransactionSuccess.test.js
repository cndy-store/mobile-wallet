import React from 'react';
import { render } from '../../__tests__/renderer';
import { Button } from 'react-native';
import TransactionSuccess from './TransactionSuccess';

const onAcknowledge = jest.fn();

it('renders correctly without an error', () => {
  const { toJSON } = render(
    <TransactionSuccess onAcknowledge={onAcknowledge} />
  );
  expect(toJSON()).toMatchSnapshot();
});

it('calls onAcknowledge when button is pressed', () => {
  const { root } = render(<TransactionSuccess onAcknowledge={onAcknowledge} />);

  root.findByType(Button).props.onPress();
  expect(onAcknowledge).toHaveBeenCalled();
});
