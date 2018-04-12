import React from 'react';
import { render } from '../__tests__/renderer';
import Emoji from './Emoji';

it('renders correctly', () => {
  const { toJSON } = render(<Emoji name={'lollipop'} />);
  expect(toJSON()).toMatchSnapshot();
});
