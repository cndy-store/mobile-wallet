import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as keypair from './keypair';
import * as storage from '../lib/keypairStorage';

jest.mock('../lib/keypairStorage');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const secret = 'SDKSKUUZDRTGFODPACA67RZT7ZVRU7H5CCXXJNXZAP7PXKAS75EDIAZB';

describe('loadKeypair', () => {
  it('resolves to a keypair if loading is successful', () => {
    const store = mockStore();
    storage.getItem.mockResolvedValueOnce(secret);

    const expectedActions = [
      { isProcessing: true, type: 'KEYPAIR_STARTS_PROCESSING' },
      { isProcessing: false, type: 'KEYPAIR_STARTS_PROCESSING' },
      { error: null, type: 'KEYPAIR_LOAD' }
    ];

    return store.dispatch(keypair.loadKeypair()).then(result => {
      expect(result.keypair.secret()).toEqual(secret);
      const actions = store.getActions();
      expect(actions[0]).toEqual(expectedActions[0]);
      expect(actions[1]).toEqual(expectedActions[1]);
      expect(actions[2]).toEqual(expect.objectContaining(expectedActions[2]));
      expect(actions[2].keypair.secret()).toEqual(secret);
    });
  });

  it('resolves keypair to null if loading is successful, but no secret was saved', () => {
    const store = mockStore();
    storage.getItem.mockResolvedValueOnce(null);

    const expectedActions = [
      { isProcessing: true, type: 'KEYPAIR_STARTS_PROCESSING' },
      { isProcessing: false, type: 'KEYPAIR_STARTS_PROCESSING' },
      { error: null, keypair: null, type: 'KEYPAIR_LOAD' }
    ];

    return store.dispatch(keypair.loadKeypair()).then(result => {
      expect(result.keypair).toEqual(null);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('rejects with error if loading fails', () => {
    const store = mockStore();
    const expectedError = new Error('Could not load');
    storage.getItem.mockRejectedValueOnce(expectedError);

    const expectedActions = [
      { isProcessing: true, type: 'KEYPAIR_STARTS_PROCESSING' },
      { isProcessing: false, type: 'KEYPAIR_STARTS_PROCESSING' },
      { error: expectedError, type: 'KEYPAIR_ERROR' }
    ];

    return store.dispatch(keypair.loadKeypair()).catch(error => {
      expect(error).toEqual({ error: expectedError });
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('saveKeypair', () => {
  it('resolves to a keypair if saving is successful', () => {
    const store = mockStore();
    storage.setItem.mockResolvedValueOnce();

    const expectedActions = [
      { isProcessing: true, type: 'KEYPAIR_STARTS_PROCESSING' },
      { isProcessing: false, type: 'KEYPAIR_STARTS_PROCESSING' },
      { error: null, type: 'KEYPAIR_SAVE' }
    ];

    return store.dispatch(keypair.saveKeypair(secret)).then(result => {
      expect(result.keypair.secret()).toEqual(secret);
      const actions = store.getActions();
      expect(actions[0]).toEqual(expectedActions[0]);
      expect(actions[1]).toEqual(expectedActions[1]);
      expect(actions[2]).toEqual(expect.objectContaining(expectedActions[2]));
      expect(actions[2].keypair.secret()).toEqual(secret);
    });
  });

  it('resolves to a keypair even if there is space padding around', () => {
    const store = mockStore();
    const paddedSecret = `   ${secret}   `;
    storage.setItem.mockResolvedValueOnce();

    const expectedActions = [
      { isProcessing: true, type: 'KEYPAIR_STARTS_PROCESSING' },
      { isProcessing: false, type: 'KEYPAIR_STARTS_PROCESSING' },
      { error: null, type: 'KEYPAIR_SAVE' }
    ];

    return store.dispatch(keypair.saveKeypair(paddedSecret)).then(result => {
      expect(result.keypair.secret()).toEqual(secret);
      const actions = store.getActions();
      expect(actions[0]).toEqual(expectedActions[0]);
      expect(actions[1]).toEqual(expectedActions[1]);
      expect(actions[2]).toEqual(expect.objectContaining(expectedActions[2]));
      expect(actions[2].keypair.secret()).toEqual(secret);
    });
  });

  it('rejects if secret is not valid', () => {
    const store = mockStore();
    const expectedError = new Error('Invalid Secret');

    const expectedActions = [
      { isProcessing: true, type: 'KEYPAIR_STARTS_PROCESSING' },
      { isProcessing: false, type: 'KEYPAIR_STARTS_PROCESSING' },
      { error: expectedError, type: 'KEYPAIR_ERROR' }
    ];

    return store
      .dispatch(keypair.saveKeypair('INVALID SECRET'))
      .catch(error => {
        expect(error).toEqual({ error: expectedError });
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('rejects if saving is not possible', () => {
    const store = mockStore();
    const expectedError = new Error('Could not save');
    storage.setItem.mockRejectedValueOnce(expectedError);

    const expectedActions = [
      { isProcessing: true, type: 'KEYPAIR_STARTS_PROCESSING' },
      { isProcessing: false, type: 'KEYPAIR_STARTS_PROCESSING' },
      { error: expectedError, type: 'KEYPAIR_ERROR' }
    ];

    return store.dispatch(keypair.saveKeypair(secret)).catch(error => {
      expect(error).toEqual({ error: expectedError });
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
    const expectedError = new Error('Could not remove');
    storage.removeItem.mockRejectedValueOnce(expectedError);

    const expectedActions = [
      { isProcessing: true, type: 'KEYPAIR_STARTS_PROCESSING' },
      { isProcessing: false, type: 'KEYPAIR_STARTS_PROCESSING' },
      { error: expectedError, type: 'KEYPAIR_ERROR' }
    ];

    return store.dispatch(keypair.removeKeypair()).catch(error => {
      expect(error).toEqual({ error: expectedError });
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
