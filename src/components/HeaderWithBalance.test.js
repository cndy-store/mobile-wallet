import React from 'react';
import renderer from 'react-test-renderer';
import { asset } from '../lib/stellar';
import { HeaderWithBalance } from './HeaderWithBalance';

it('renders correctly when no balance is given', () => {
  const tree = renderer.create(<HeaderWithBalance />).toJSON();
  expect(tree).toMatchSnapshot();
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

  const tree = renderer.create(<HeaderWithBalance data={data} />).toJSON();
  expect(tree).toMatchSnapshot();
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

  const tree = renderer.create(<HeaderWithBalance data={data} />).toJSON();
  expect(tree).toMatchSnapshot();
});
