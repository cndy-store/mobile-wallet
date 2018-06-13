import React from 'react';
import { render } from '../__tests__/renderer';
import FormError from './FormError';

it('renders correctly', () => {
  const { toJSON } = render(<FormError message="Could not be saved!" />);
  expect(toJSON()).toMatchSnapshot();
});
