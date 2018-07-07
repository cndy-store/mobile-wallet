import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as payments from './payments';
import * as api from '../lib/stellarAPI';
import { publicKey } from '../__tests__/fixtures/keypair';

jest.mock('../lib/stellarAPI');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const paymentsFixture = {
  payments: 'DUMMY_PAYMENTS',
  data: 'DUMMY_DATA',
  hasNextPage: true,
  publicKey
};

describe('loadPayments', () => {
  it('resolves to payments if loading is successful', () => {
    const store = mockStore();
    api.loadPayments.mockResolvedValueOnce(paymentsFixture);

    const expectedActions = [
      { isProcessing: true, type: 'PAYMENTS_STARTS_PROCESSING' },
      {
        isProcessing: false,
        error: null,
        firstPageLoaded: true,
        type: 'PAYMENTS_LOAD'
      }
    ];

    return store.dispatch(payments.loadPayments(publicKey)).then(result => {
      expect(result).toEqual(paymentsFixture);
      const actions = store.getActions();
      expect(actions[0]).toEqual(expectedActions[0]);
      expect(actions[1]).toEqual(expect.objectContaining(expectedActions[1]));
      expect(actions[1].payments).toEqual(paymentsFixture.payments);
      expect(actions[1].hasNextPage).toEqual(paymentsFixture.hasNextPage);
      expect(actions[1].data).toEqual(paymentsFixture.data);
    });
  });

  it('rejects with error if loading fails', () => {
    const store = mockStore();
    const expectedError = new Error('Could not load payments');
    api.loadPayments.mockRejectedValueOnce(expectedError);

    const expectedActions = [
      { isProcessing: true, type: 'PAYMENTS_STARTS_PROCESSING' },
      { isProcessing: false, error: expectedError, type: 'PAYMENTS_ERROR' }
    ];

    return store.dispatch(payments.loadPayments(publicKey)).catch(error => {
      expect(error).toEqual(expectedError);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('markPaymentAsSeen', () => {
  it('resolves if marking was dispatched successful', () => {
    const paymentId = '123456';
    const store = mockStore();
    const expectedActions = [
      {
        type: 'PAYMENTS_MARK_AS_SEEN',
        paymentId
      }
    ];

    return store
      .dispatch(payments.markPaymentAsSeen({ paymentId }))
      .then(result => {
        expect(result).toEqual({ paymentId });
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
      });
  });
});
