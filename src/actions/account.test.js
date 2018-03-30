import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as account from './account';
import * as api from '../lib/stellarAPI';
import { publicKey } from '../__tests__/fixtures/keypair';

jest.mock('../lib/stellarAPI');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const accountFixture = { account: 'DUMMY_ACCOUNT', data: 'DUMMY_DATA' };

describe('loadAccount', () => {
  it('resolves to an account if loading is successful', () => {
    const store = mockStore();
    api.loadAccount.mockResolvedValueOnce(accountFixture);

    const expectedActions = [
      { isProcessing: true, type: 'ACCOUNT_STARTS_PROCESSING' },
      { isProcessing: false, error: null, type: 'ACCOUNT_LOAD' }
    ];

    return store.dispatch(account.loadAccount(publicKey)).then(result => {
      expect(result).toEqual(accountFixture);
      const actions = store.getActions();
      expect(actions[0]).toEqual(expectedActions[0]);
      expect(actions[1]).toEqual(expect.objectContaining(expectedActions[1]));
      expect(actions[1].account).toEqual(accountFixture.account);
      expect(actions[1].data).toEqual(accountFixture.data);
    });
  });

  it('rejects with error if loading fails', () => {
    const store = mockStore();
    const expectedError = new Error('Could not load account');
    api.loadAccount.mockRejectedValueOnce(expectedError);

    const expectedActions = [
      { isProcessing: true, type: 'ACCOUNT_STARTS_PROCESSING' },
      { isProcessing: false, error: expectedError, type: 'ACCOUNT_ERROR' }
    ];

    return store.dispatch(account.loadAccount(publicKey)).catch(error => {
      expect(error).toEqual({ error: expectedError });
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
