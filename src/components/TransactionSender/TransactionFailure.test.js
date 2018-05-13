import React from 'react';
import { render } from '../../__tests__/renderer';
import { publicKey } from '../../__tests__/fixtures/keypair';
import { Button } from 'native-base';
import TransactionFailure from './TransactionFailure';

const onAcknowledge = jest.fn();
const amount = '12.000';
const error = 'op_underfunded';

it('renders correctly without an error', () => {
  const { toJSON } = render(
    <TransactionFailure
      receiver={publicKey}
      error={error}
      amount={amount}
      onAcknowledge={onAcknowledge}
    />
  );
  expect(toJSON()).toMatchSnapshot();
});

it('calls onAcknowledge when button is pressed', () => {
  const { root } = render(
    <TransactionFailure
      receiver={publicKey}
      error={error}
      amount={amount}
      onAcknowledge={onAcknowledge}
    />
  );

  root.findByType(Button).props.onPress();
  expect(onAcknowledge).toHaveBeenCalled();
});
