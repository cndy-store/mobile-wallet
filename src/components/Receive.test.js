import React from 'react';
import QRCode from 'react-native-qrcode-svg';
import { render } from '../__tests__/renderer';
import { Receive } from './Receive';
import { secret } from '../__tests__/fixtures/keypair';
import { StellarSdk } from '../lib/stellar';

const keypair = StellarSdk.Keypair.fromSecret(secret);

it('renders correctly', () => {
  const { toJSON } = render(<Receive keypair={keypair} />);
  expect(toJSON()).toMatchSnapshot();
});
