import React from 'react';
import { render } from '../__tests__/renderer';
import { asset } from '../lib/stellar';
import ShortenedPublicKey from './ShortenedPublicKey';

import { publicKey } from '../__tests__/fixtures/keypair';

it('renders correctly', () => {
  const { toJSON } = render(<ShortenedPublicKey publicKey={publicKey} />);
  expect(toJSON()).toMatchSnapshot();
});
