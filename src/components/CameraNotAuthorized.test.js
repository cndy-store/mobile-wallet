import React from 'react';
import { render } from '../__tests__/renderer';
import CameraNotAuthorized from './CameraNotAuthorized';

it('renders correctly', () => {
  const { toJSON } = render(<CameraNotAuthorized />);
  expect(toJSON()).toMatchSnapshot();
});
