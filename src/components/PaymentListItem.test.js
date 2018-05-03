import React from 'react';
import { render } from '../__tests__/renderer';
import PaymentListItem from './PaymentListItem';

import { publicKey } from '../__tests__/fixtures/keypair';

it('renders correctly with type credit', () => {
  const { toJSON } = render(
    <PaymentListItem
      type="credit"
      publicKey={publicKey}
      amount="12.00"
      createdAt="2018-05-03T12:00:00Z"
    />
  );
  expect(toJSON()).toMatchSnapshot();
});

it('renders correctly with type debit', () => {
  const { toJSON } = render(
    <PaymentListItem
      type="debit"
      publicKey={publicKey}
      amount="12.00"
      createdAt="2018-05-03T12:00:00Z"
    />
  );
  expect(toJSON()).toMatchSnapshot();
});
