import {
  PAYMENTS_STARTS_PROCESSING,
  PAYMENTS_ERROR,
  PAYMENTS_LOAD
} from '../actions/payments';

import reducer from './payments';

const defaultState = {
  isProcessing: false,
  error: null,
  payments: [],
  firstPageLoaded: false,
  hasNextPage: false,
  data: null
};

it('returns the initial state', () => {
  expect(reducer(undefined, {})).toEqual(defaultState);
});

it('handles PAYMENTS_STARTS_PROCESSING', () => {
  expect(
    reducer(undefined, {
      type: PAYMENTS_STARTS_PROCESSING,
      isProcessing: true
    })
  ).toEqual({
    isProcessing: true,
    error: null,
    payments: [],
    firstPageLoaded: false,
    hasNextPage: false,
    data: null
  });
});

it('handles PAYMENTS_ERROR', () => {
  expect(
    reducer(undefined, {
      type: PAYMENTS_ERROR,
      error: 'error message',
      isProcessing: false
    })
  ).toEqual({
    isProcessing: false,
    error: 'error message',
    payments: [],
    firstPageLoaded: false,
    hasNextPage: false,
    data: null
  });
});

it('handles the first PAYMENTS_LOAD', () => {
  expect(
    reducer(undefined, {
      type: PAYMENTS_LOAD,
      payments: ['PAYMENTS'],
      data: 'DATA',
      firstPageLoaded: true,
      hasNextPage: true,
      error: null,
      isProcessing: false
    })
  ).toEqual({
    isProcessing: false,
    error: null,
    payments: ['PAYMENTS'],
    data: 'DATA',
    firstPageLoaded: true,
    hasNextPage: true
  });
});

it('replaces the PAYMENTS_LOAD with existing payments in the state', () => {
  expect(
    reducer(
      { payments: ['EXISTING_PAYMENTS'] },
      {
        type: PAYMENTS_LOAD,
        payments: ['PAYMENTS'],
        data: 'DATA',
        hasNextPage: true,
        error: null,
        isProcessing: false
      }
    )
  ).toEqual({
    isProcessing: false,
    error: null,
    payments: ['PAYMENTS'],
    data: 'DATA',
    hasNextPage: true
  });
});
