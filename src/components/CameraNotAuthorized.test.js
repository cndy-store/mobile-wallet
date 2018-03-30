import React from 'react';
import renderer from 'react-test-renderer';
import CameraNotAuthorized from './CameraNotAuthorized';

it('renders correctly', () => {
  const tree = renderer.create(<CameraNotAuthorized />).toJSON();
  expect(tree).toMatchSnapshot();
});
