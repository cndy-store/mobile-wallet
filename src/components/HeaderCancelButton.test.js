import React from 'react';
import { render } from '../__tests__/renderer';
import { Platform } from 'react-native';
import HeaderCancelButton from './HeaderCancelButton';

it('renders correctly for ios', () => {
  HeaderCancelButton.prototype.getPlatform = jest.fn(() => 'ios');

  const onCancel = jest.fn();
  const { toJSON } = render(<HeaderCancelButton onCancel={onCancel} />);
  expect(toJSON()).toMatchSnapshot();
});

it('renders correctly for android', () => {
  HeaderCancelButton.prototype.getPlatform = jest.fn(() => 'android');

  const onCancel = jest.fn();
  const { toJSON } = render(<HeaderCancelButton onCancel={onCancel} />);
  expect(toJSON()).toMatchSnapshot();
});
