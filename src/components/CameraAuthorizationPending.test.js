import React from 'react';
import CameraAuthorizationPending from './CameraAuthorizationPending.js';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(<CameraAuthorizationPending />).toJSON();
  expect(tree).toMatchSnapshot();
});
