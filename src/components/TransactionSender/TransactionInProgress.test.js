import React from 'react';
import renderer from 'react-test-renderer';
import TransactionInProgress from './TransactionInProgress';

it('renders correctly without an error', () => {
  const tree = renderer.create(<TransactionInProgress />).toJSON();
  expect(tree).toMatchSnapshot();
});
