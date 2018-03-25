import React from 'react';
import { asset } from '../lib/stellar';
import { BarCodeScanner } from './BarCodeScanner.js';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(<BarCodeScanner />).toJSON();
  expect(tree).toMatchSnapshot();
});
