import React from 'react';
import renderer from 'react-test-renderer';
import TransactionFailure from './TransactionFailure';

it('renders correctly without an error', () => {
  const tree = renderer.create(<TransactionFailure />).toJSON();
  expect(tree).toMatchSnapshot();
});
