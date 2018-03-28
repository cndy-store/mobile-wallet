import React from 'react';
import Emoji from './Emoji';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(<Emoji name={'lollipop'} />).toJSON();
  expect(tree).toMatchSnapshot();
});
