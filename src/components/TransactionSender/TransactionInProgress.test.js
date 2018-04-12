import React from 'react';
import { render } from '../../__tests__/renderer';
import TransactionInProgress from './TransactionInProgress';

it('renders correctly without an error', () => {
  const { toJSON } = render(<TransactionInProgress />);
  expect(toJSON()).toMatchSnapshot();
});
