import React from 'react';
import renderer from 'react-test-renderer';
import { asset } from '../lib/stellar';
import ShortenedPublicKey from './ShortenedPublicKey';

import { publicKey } from '../__tests__/fixtures/keypair';

it('renders correctly', () => {
  const tree = renderer
    .create(<ShortenedPublicKey publicKey={publicKey} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
