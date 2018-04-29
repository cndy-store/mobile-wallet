import React from 'react';
import { InitialLoadingScreen } from './InitialLoadingScreen';
import { render } from '../__tests__/renderer';

const loadKeypair = jest.fn();
const loadAccount = jest.fn();
const navigate = jest.fn();
const navigation = { navigate };

it('renders correctly', () => {
  const { toJSON } = render(
    <InitialLoadingScreen
      navigation={navigation}
      loadKeypair={loadKeypair}
      loadAccount={loadAccount}
    />
  );

  expect(toJSON()).toMatchSnapshot();
});

it('calls the loadKeypair function', () => {
  render(
    <InitialLoadingScreen
      navigation={navigation}
      loadKeypair={loadKeypair}
      loadAccount={loadAccount}
    />
  );

  expect(loadKeypair).toHaveBeenCalled();
});

it('opens the KeySetup screen when no key was found', done => {
  loadKeypair.mockResolvedValueOnce({ keypair: null });

  render(
    <InitialLoadingScreen
      navigation={navigation}
      loadKeypair={loadKeypair}
      loadAccount={loadAccount}
    />
  );

  setTimeout(() => {
    expect(navigate).toHaveBeenCalledWith('KeySetup');
    done();
  }, 1);
});

it('opens the Main screen when a key was found', done => {
  const fakeKeypair = { publicKey: jest.fn() };
  loadKeypair.mockResolvedValueOnce({ keypair: fakeKeypair });
  loadAccount.mockResolvedValueOnce({});

  render(
    <InitialLoadingScreen
      navigation={navigation}
      loadKeypair={loadKeypair}
      loadAccount={loadAccount}
    />
  );

  setTimeout(() => {
    expect(navigate).toHaveBeenCalledWith('Main');

    done();
  }, 1);
});
