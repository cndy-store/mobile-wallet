import {
  KEYPAIR_STARTS_PROCESSING,
  KEYPAIR_ERROR,
  KEYPAIR_LOAD,
  KEYPAIR_SAVE,
  KEYPAIR_REMOVE
} from '../actions/keypair';

import reducer from './keypair';

const defaultState = {
  isProcessing: false,
  error: null,
  keypair: null
};

it('returns the initial state', () => {
  expect(reducer(undefined, {})).toEqual(defaultState);
});

it('handles KEYPAIR_STARTS_PROCESSING', () => {
  expect(
    reducer(undefined, {
      type: KEYPAIR_STARTS_PROCESSING,
      isProcessing: true
    })
  ).toEqual({
    isProcessing: true,
    error: null,
    keypair: null
  });
});

it('handles KEYPAIR_ERROR', () => {
  expect(
    reducer(undefined, {
      type: KEYPAIR_ERROR,
      error: 'error message',
      isProcessing: false
    })
  ).toEqual({
    isProcessing: false,
    error: 'error message',
    keypair: null
  });
});

it('handles KEYPAIR_LOAD', () => {
  expect(
    reducer(undefined, {
      type: KEYPAIR_LOAD,
      keypair: 'SECRET',
      error: null,
      isProcessing: false
    })
  ).toEqual({
    isProcessing: false,
    error: null,
    keypair: 'SECRET'
  });
});

it('handles KEYPAIR_SAVE', () => {
  expect(
    reducer(undefined, {
      type: KEYPAIR_SAVE,
      keypair: 'SECRET',
      error: null,
      isProcessing: false
    })
  ).toEqual({
    isProcessing: false,
    error: null,
    keypair: 'SECRET'
  });
});

it('handles KEYPAIR_REMOVE', () => {
  expect(
    reducer(undefined, {
      type: KEYPAIR_REMOVE,
      keypair: null,
      error: null,
      isProcessing: false
    })
  ).toEqual({
    isProcessing: false,
    error: null,
    keypair: null
  });
});
