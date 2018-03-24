import {
  ACCOUNT_STARTS_PROCESSING,
  ACCOUNT_ERROR,
  ACCOUNT_LOAD
} from '../actions/account';

import reducer from './account';

const defaultState = {
  isProcessing: false,
  error: null,
  account: null,
  data: null
};

it('returns the initial state', () => {
  expect(reducer(undefined, {})).toEqual(defaultState);
});

it('handles ACCOUNT_STARTS_PROCESSING', () => {
  expect(
    reducer(undefined, {
      type: ACCOUNT_STARTS_PROCESSING,
      isProcessing: true
    })
  ).toEqual({
    isProcessing: true,
    error: null,
    account: null,
    data: null
  });
});

it('handles ACCOUNT_ERROR', () => {
  expect(
    reducer(undefined, {
      type: ACCOUNT_ERROR,
      error: 'error message',
      isProcessing: false
    })
  ).toEqual({
    isProcessing: false,
    error: 'error message',
    account: null,
    data: null
  });
});

it('handles ACCOUNT_LOAD', () => {
  expect(
    reducer(undefined, {
      type: ACCOUNT_LOAD,
      account: 'ACCOUNT',
      data: 'DATA',
      error: null,
      isProcessing: false
    })
  ).toEqual({
    isProcessing: false,
    error: null,
    account: 'ACCOUNT',
    data: 'DATA'
  });
});
