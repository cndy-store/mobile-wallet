import React from 'react';
import { render } from '../__tests__/renderer';
import { asset } from '../lib/stellar';
import DisplayPublicKey from './DisplayPublicKey';

import { publicKey } from '../__tests__/fixtures/keypair';

it('renders a public key correctly', () => {
  const { toJSON } = render(<DisplayPublicKey publicKey={publicKey} />);
  expect(toJSON()).toMatchSnapshot();
});
