import React from 'react';
import { render } from '../__tests__/renderer';
import { BarCodeScanner } from './BarCodeScanner';

it('renders correctly', () => {
  const onCancel = jest.fn();
  const onCodeScan = jest.fn();
  const decoder = jest.fn();

  const { toJSON } = render(
    <BarCodeScanner
      onCancel={onCancel}
      onCodeScan={onCodeScan}
      decoder={decoder}
    />
  );
  expect(toJSON()).toMatchSnapshot();
});
