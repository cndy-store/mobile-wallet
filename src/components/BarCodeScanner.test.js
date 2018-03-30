import React from 'react';
import { BarCodeScanner } from './BarCodeScanner';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const onCancel = jest.fn();
  const onCodeScan = jest.fn();
  const decoder = jest.fn();

  const tree = renderer
    .create(
      <BarCodeScanner
        onCancel={onCancel}
        onCodeScan={onCodeScan}
        decoder={decoder}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
