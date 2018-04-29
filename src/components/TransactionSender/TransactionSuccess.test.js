import React from 'react';
import { render } from '../../__tests__/renderer';
import { publicKey } from '../../__tests__/fixtures/keypair';
import { Button } from 'native-base';
import TransactionSuccess from './TransactionSuccess';

const onAcknowledge = jest.fn();
const amount = '12.000';

it('renders correctly without an error', () => {
  const { toJSON } = render(
    <TransactionSuccess
      receiver={publicKey}
      amount={amount}
      onAcknowledge={onAcknowledge}
    />
  );
  expect(toJSON()).toMatchSnapshot();
});

it('calls onAcknowledge when button is pressed', () => {
  const { root } = render(
    <TransactionSuccess
      receiver={publicKey}
      amount={amount}
      onAcknowledge={onAcknowledge}
    />
  );

  root.findByType(Button).props.onPress();
  expect(onAcknowledge).toHaveBeenCalled();
});
