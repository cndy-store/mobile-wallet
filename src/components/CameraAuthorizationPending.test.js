import React from 'react';
import { render } from '../__tests__/renderer';
import CameraAuthorizationPending from './CameraAuthorizationPending.js';

it('renders correctly', () => {
  const { toJSON } = render(<CameraAuthorizationPending />);
  expect(toJSON()).toMatchSnapshot();
});
