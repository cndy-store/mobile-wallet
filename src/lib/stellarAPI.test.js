import MockAdapter from 'axios-mock-adapter';
import { asset, axios, StellarSdk } from './stellar';
import * as api from './stellarAPI';

import { publicKey, secret } from '../__tests__/fixtures/keypair';
import paymentsResponse from '../__tests__/fixtures/response_account_payments';

let mock;

beforeEach(() => {
  mock = new MockAdapter(axios);
});

describe('loadAccount', () => {
  it('returns response and an Account object', () => {
    mock.onGet(/accounts/).reply(200, {
      sequence: '1'
    });

    return api.loadAccount(publicKey).then(response => {
      expect(response.account.accountId()).toEqual(publicKey);
      expect(response.account.sequenceNumber()).toEqual('1');
      expect(response.data).toEqual({ sequence: '1' });
    });
  });

  it('handles a non-successful response', () => {
    mock.onGet(/accounts/).reply(404);

    return api.loadAccount(publicKey).catch(error => {
      expect(error).toEqual(new Error('Request failed with status code 404'));
    });
  });

  it('handles a timeout', () => {
    mock.onGet(/accounts/).timeout();

    return api.loadAccount(publicKey).catch(error => {
      expect(error).toEqual(new Error('timeout of 10000ms exceeded'));
    });
  });

  it('handles a network error', () => {
    mock.onGet(/accounts/).networkError();

    return api.loadAccount(publicKey).catch(error => {
      expect(error).toEqual(new Error('Network Error'));
    });
  });
});

describe('loadPayments', () => {
  const expectedUrl = `accounts/${publicKey}/payments`;

  it('returns response, a list of payment objects and indicator if next page could be loaded', () => {
    mock.onGet(expectedUrl).reply(200, paymentsResponse);

    return api.loadPayments({ publicKey }).then(response => {
      expect(response.data).toEqual(paymentsResponse);
      expect(response.hasNextPage).toEqual(false);
      expect(response.payments).toBeDefined();
    });
  });

  it('only returns payments that match the asset and are an actual payment', () => {
    mock.onGet(expectedUrl).reply(200, paymentsResponse);

    return api.loadPayments({ publicKey }).then(response => {
      expect(response.payments.length).toEqual(24);
      response.payments.forEach(payment => {
        expect(payment.type).toEqual('payment');
        expect(payment.asset_code).toEqual('CNDY');
        expect(payment.asset_issuer).toEqual(asset.getIssuer());
      });
    });
  });

  it('indicates a next page, if the limit is fulfilled', () => {
    mock.onGet(expectedUrl).reply(200, paymentsResponse);

    return api
      .loadPayments({ publicKey, params: { limit: 27 } })
      .then(response => {
        expect(response.hasNextPage).toEqual(true);
        // the limit is based on the number of returned records before the filtering
        expect(response.payments.length).toEqual(24);
      });
  });

  it('handles a non-successful response', () => {
    mock.onGet(expectedUrl).reply(404);

    return api.loadPayments({ publicKey }).catch(error => {
      expect(error).toEqual(new Error('Request failed with status code 404'));
    });
  });

  it('handles a timeout', () => {
    mock.onGet(expectedUrl).timeout();

    return api.loadPayments({ publicKey }).catch(error => {
      expect(error).toEqual(new Error('timeout of 10000ms exceeded'));
    });
  });

  it('handles a network error', () => {
    mock.onGet(expectedUrl).networkError();

    return api.loadPayments({ publicKey }).catch(error => {
      expect(error).toEqual(new Error('Network Error'));
    });
  });
});

describe('sendPayment', () => {
  const amount = '10.00';
  const receiver = 'GARYCROHQXWIQIRMGFRVFXDX53Y2RYUOYRJPB6OHLHIQ53AMLXM22EZL';
  const keypair = StellarSdk.Keypair.fromSecret(secret);
  const transactionResponse = {
    envelope_xdr: 'AAAAJ+OTR6E2WRGbJ9c7whJ7vpuNKolGylUOVVL0Zh4AM=',
    hash: 'd81b76976560e36014cd9fac5dc1705d63d2946156578fc2cc169137b53f28ce',
    ledger: 8075356,
    result_meta_xdr:
      'AAAAAAAH/////wZXeNUxgVzdo91rOI7LvjXs/ntCPQAAAACKlK9AH///////AAAAAA',
    result_xdr: 'AAAAAAAAAGQAAAAAAAAAAQAAAAAAAAABAAAAAAAAAAA='
  };

  beforeEach(() => {
    mock.onGet(/accounts/).reply(200, {
      sequence: '1'
    });
  });

  it('returns a transaction', () => {
    mock.onPost(/transactions/).reply(201, transactionResponse);

    return api.sendPayment({ amount, receiver, keypair }).then(response => {
      expect(response.data).toEqual(transactionResponse);
    });
  });

  it('handles a non-successful account loading', () => {
    mock.onPost(/transactions/).reply(406);

    return api.sendPayment({ amount, receiver, keypair }).catch(error => {
      expect(error).toEqual(new Error('Request failed with status code 406'));
    });
  });

  it('handles a timeout', () => {
    mock.onPost(/transactions/).timeout();

    return api.sendPayment({ amount, receiver, keypair }).catch(error => {
      expect(error).toEqual(new Error('timeout of 10000ms exceeded'));
    });
  });

  it('handles a network error', () => {
    mock.onPost(/transactions/).networkError();

    return api.sendPayment({ amount, receiver, keypair }).catch(error => {
      expect(error).toEqual(new Error('Network Error'));
    });
  });
});
