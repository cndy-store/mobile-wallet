import React from 'react';
import renderer from 'react-test-renderer';
import TransactionSuccess from './TransactionSuccess';

it('renders correctly without an error', () => {
  const tree = renderer.create(<TransactionSuccess />).toJSON();
  expect(tree).toMatchSnapshot();
});
