import React from 'react';
import { InitialLoadingScreen } from './InitialLoadingScreen';

import renderer from 'react-test-renderer';

const loadKeypair = jest.fn();
const loadAccount = jest.fn();
const navigate = jest.fn();
const navigation = { navigate };

it('renders correctly', () => {
  const tree = renderer
    .create(
      <InitialLoadingScreen
        navigation={navigation}
        loadKeypair={loadKeypair}
        loadAccount={loadAccount}
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('calls the loadKeypair function', () => {
  renderer.create(
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

  renderer.create(
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

it('opens the Main screen and load account when a key was found', done => {
  const fakeKeypair = { publicKey: jest.fn() };
  loadKeypair.mockResolvedValueOnce({ keypair: fakeKeypair });

  renderer.create(
    <InitialLoadingScreen
      navigation={navigation}
      loadKeypair={loadKeypair}
      loadAccount={loadAccount}
    />
  );

  setTimeout(() => {
    expect(navigate).toHaveBeenCalledWith('Main');
    expect(loadAccount).toHaveBeenCalled();
    done();
  }, 1);
});
