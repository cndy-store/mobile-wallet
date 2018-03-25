import React from 'react';
import CameraNotAuthorized from './CameraNotAuthorized.js';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(<CameraNotAuthorized />).toJSON();
  expect(tree).toMatchSnapshot();
});
