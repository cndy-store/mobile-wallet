import React from 'react';
import renderer from 'react-test-renderer';
import Emoji from './Emoji';

it('renders correctly', () => {
  const tree = renderer.create(<Emoji name={'lollipop'} />).toJSON();
  expect(tree).toMatchSnapshot();
});
