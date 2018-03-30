import * as api from '../lib/stellarAPI';

export const ACCOUNT_STARTS_PROCESSING = 'ACCOUNT_STARTS_PROCESSING';
export const ACCOUNT_ERROR = 'ACCOUNT_ERROR';
export const ACCOUNT_LOAD = 'ACCOUNT_LOAD';

export const accountProcessing = bool => ({
  type: ACCOUNT_STARTS_PROCESSING,
  isProcessing: bool
});

export const accountErrored = ({ error }) => ({
  type: ACCOUNT_ERROR,
  isProcessing: false,
  error
});

export const accountLoadSucceded = ({ account, data }) => ({
  type: ACCOUNT_LOAD,
  isProcessing: false,
  error: null,
  account,
  data
});

export const loadAccount = publicKey => {
  return async dispatch => {
    dispatch(accountProcessing(true));
    try {
      const response = await api.loadAccount(publicKey);
      const { account, data } = response;
      dispatch(accountLoadSucceded({ account, data }));
      return Promise.resolve({ account, data });
    } catch (error) {
      dispatch(accountErrored({ error }));
      return Promise.reject({ error });
    }
  };
};
