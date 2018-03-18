import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as keypair from './keypair';
import * as storage from '../lib/keypairStorage';

jest.mock('../lib/keypairStorage');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const secret = 'SDKSKUUZDRTGFODPACA67RZT7ZVRU7H5CCXXJNXZAP7PXKAS75EDIAZB';

describe('loadKeypair', () => {
  it('resolves to a secret if loading is successful', () => {
    const store = mockStore();
    storage.getItem.mockResolvedValueOnce('SECRET');

    const expectedActions = [
      { isProcessing: true, type: 'KEYPAIR_STARTS_PROCESSING' },
      { isProcessing: false, type: 'KEYPAIR_STARTS_PROCESSING' },
      { error: null, keypair: 'SECRET', type: 'KEYPAIR_LOAD' }
    ];

    return store.dispatch(keypair.loadKeypair()).then(result => {
      expect(result).toEqual({ secret: 'SECRET' });
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('resolves secret to null if loading is successful, but no secret was saved', () => {
    const store = mockStore();
    storage.getItem.mockResolvedValueOnce(null);

    const expectedActions = [
      { isProcessing: true, type: 'KEYPAIR_STARTS_PROCESSING' },
      { isProcessing: false, type: 'KEYPAIR_STARTS_PROCESSING' },
      { error: null, keypair: null, type: 'KEYPAIR_LOAD' }
    ];

    return store.dispatch(keypair.loadKeypair()).then(result => {
      expect(result).toEqual({ secret: null });
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('rejects with error if loading fails', () => {
    const store = mockStore();
    storage.getItem.mockRejectedValueOnce('could not load!');

    const expectedActions = [
      { isProcessing: true, type: 'KEYPAIR_STARTS_PROCESSING' },
      { isProcessing: false, type: 'KEYPAIR_STARTS_PROCESSING' },
      { error: 'could not load!', type: 'KEYPAIR_ERROR' }
    ];

    return store.dispatch(keypair.loadKeypair()).catch(error => {
      expect(error).toEqual({ error: 'could not load!' });
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('saveKeypair', () => {
  it('resolves to a secret if saving is successful', () => {
    const store = mockStore();
    storage.setItem.mockResolvedValueOnce();

    const expectedActions = [
      { isProcessing: true, type: 'KEYPAIR_STARTS_PROCESSING' },
      { isProcessing: false, type: 'KEYPAIR_STARTS_PROCESSING' },
      { error: null, keypair: secret, type: 'KEYPAIR_SAVE' }
    ];

    return store.dispatch(keypair.saveKeypair(secret)).then(result => {
      expect(result).toEqual({ secret: secret });
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('resolves to a secret even if there is space padding around', () => {
    const store = mockStore();
    const paddedSecret = `   ${secret}   `;
    storage.setItem.mockResolvedValueOnce();

    const expectedActions = [
      { isProcessing: true, type: 'KEYPAIR_STARTS_PROCESSING' },
      { isProcessing: false, type: 'KEYPAIR_STARTS_PROCESSING' },
      { error: null, keypair: secret, type: 'KEYPAIR_SAVE' }
    ];

    return store.dispatch(keypair.saveKeypair(paddedSecret)).then(result => {
      expect(result).toEqual({ secret: secret });
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('rejects if secret is not valid', () => {
    const store = mockStore();

    const expectedActions = [
      { isProcessing: true, type: 'KEYPAIR_STARTS_PROCESSING' },
      { isProcessing: false, type: 'KEYPAIR_STARTS_PROCESSING' },
      { error: null, error: 'Invalid Secret', type: 'KEYPAIR_ERROR' }
    ];

    return store
      .dispatch(keypair.saveKeypair('INVALID SECRET'))
      .catch(error => {
        expect(error).toEqual({ error: 'Invalid Secret' });
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('rejects if saving is not possible', () => {
    const store = mockStore();
    storage.setItem.mockRejectedValueOnce('could not save!');

    const expectedActions = [
      { isProcessing: true, type: 'KEYPAIR_STARTS_PROCESSING' },
      { isProcessing: false, type: 'KEYPAIR_STARTS_PROCESSING' },
      { error: null, error: 'could not save!', type: 'KEYPAIR_ERROR' }
    ];

    return store.dispatch(keypair.saveKeypair(secret)).catch(error => {
      expect(error).toEqual({ error: 'could not save!' });
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('removeKeypair', () => {
  it('resolves to null if removing is successful', () => {
    const store = mockStore();
    storage.removeItem.mockResolvedValueOnce();

    const expectedActions = [
      { isProcessing: true, type: 'KEYPAIR_STARTS_PROCESSING' },
      { isProcessing: false, type: 'KEYPAIR_STARTS_PROCESSING' },
      { error: null, keypair: null, type: 'KEYPAIR_REMOVE' }
    ];

    return store.dispatch(keypair.removeKeypair()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('rejects if removing is not possible', () => {
    const store = mockStore();
    storage.removeItem.mockRejectedValueOnce('could not remove!');

    const expectedActions = [
      { isProcessing: true, type: 'KEYPAIR_STARTS_PROCESSING' },
      { isProcessing: false, type: 'KEYPAIR_STARTS_PROCESSING' },
      { error: null, error: 'could not remove!', type: 'KEYPAIR_ERROR' }
    ];

    return store.dispatch(keypair.removeKeypair()).catch(error => {
      expect(error).toEqual({ error: 'could not remove!' });
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
