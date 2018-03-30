import React from 'react';
import renderer from 'react-test-renderer';
import CameraAuthorizationPending from './CameraAuthorizationPending.js';

it('renders correctly', () => {
  const tree = renderer.create(<CameraAuthorizationPending />).toJSON();
  expect(tree).toMatchSnapshot();
});
