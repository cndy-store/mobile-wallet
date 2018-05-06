import React from 'react';
import QRCode from 'react-native-qrcode-svg';
import { render } from '../__tests__/renderer';
import { Receive } from './Receive';
import { publicKey } from '../__tests__/fixtures/keypair';

it('renders correctly', () => {
  const { toJSON } = render(<Receive keypair={publicKey} />);
  expect(toJSON()).toMatchSnapshot();
});
