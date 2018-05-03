import React from 'react';
import { render } from '../__tests__/renderer';
import { MainScreenHeader } from './MainScreenHeader';
import { Button } from 'native-base';

jest.mock('./HeaderTitleWithBalance', () => {
  return jest.fn(() => null);
});

it('renders correctly', () => {
  const { toJSON } = render(<MainScreenHeader />);
  expect(toJSON()).toMatchSnapshot();
});

it('renders correctly when marked with no tabs', () => {
  const { toJSON } = render(<MainScreenHeader hasTabs={false} />);
  expect(toJSON()).toMatchSnapshot();
});

it('opens the drawer when button is clicked', () => {
  const navigate = jest.fn();
  const navigation = { navigate };

  const { root, toJSON } = render(<MainScreenHeader navigation={navigation} />);

  const input = root.findByType(Button);
  input.props.onPress();

  expect(navigate).toHaveBeenCalledWith('DrawerOpen');
});
