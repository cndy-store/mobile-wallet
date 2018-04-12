import React from 'react';
import { render } from '../__tests__/renderer';
import { asset } from '../lib/stellar';
import { HeaderWithBalance } from './HeaderWithBalance';

it('renders correctly when no balance is given', () => {
  const { toJSON } = render(<HeaderWithBalance />);
  expect(toJSON()).toMatchSnapshot();
});

it('renders correctly when account data is present, but not for the desired asset', () => {
  const data = {
    balances: [
      {
        balance: '9999.9999000',
        asset_type: 'native'
      }
    ]
  };

  const { toJSON } = render(<HeaderWithBalance data={data} />);
  expect(toJSON()).toMatchSnapshot();
});

it('renders correctly when a balance is given', () => {
  const data = {
    balances: [
      {
        balance: '930.0000000',
        limit: '922337203685.4775807',
        asset_type: 'credit_alphanum4',
        asset_code: asset.getCode(),
        asset_issuer: asset.getIssuer()
      },
      {
        balance: '9999.9999000',
        asset_type: 'native'
      }
    ]
  };

  const { toJSON } = render(<HeaderWithBalance data={data} />);
  expect(toJSON()).toMatchSnapshot();
});
