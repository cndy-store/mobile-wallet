import * as api from '../lib/stellarAPI';

export const PAYMENTS_STARTS_PROCESSING = 'PAYMENTS_STARTS_PROCESSING';
export const PAYMENTS_ERROR = 'PAYMENTS_ERROR';
export const PAYMENTS_LOAD = 'PAYMENTS_LOAD';
export const PAYMENTS_MARK_AS_SEEN = 'PAYMENTS_MARK_AS_SEEN';

export const paymentsProcessing = bool => ({
  type: PAYMENTS_STARTS_PROCESSING,
  isProcessing: bool
});

export const paymentsErrored = ({ error }) => ({
  type: PAYMENTS_ERROR,
  isProcessing: false,
  error
});

export const paymentsLoadSucceded = ({ payments, data, hasNextPage }) => ({
  type: PAYMENTS_LOAD,
  isProcessing: false,
  error: null,
  firstPageLoaded: true,
  payments,
  hasNextPage,
  data
});

export const paymentMarkedAsSeen = ({ paymentId }) => ({
  type: PAYMENTS_MARK_AS_SEEN,
  paymentId
});

export const markPaymentAsSeen = ({ paymentId }) => {
  return async dispatch => {
    dispatch(paymentMarkedAsSeen({ paymentId }));
    return Promise.resolve({ paymentId });
  };
};

export const loadPayments = publicKey => {
  return async dispatch => {
    dispatch(paymentsProcessing(true));
    try {
      const response = await api.loadPayments({ publicKey });
      const { payments, data, hasNextPage } = response;
      dispatch(paymentsLoadSucceded({ payments, data, hasNextPage }));
      return Promise.resolve({ payments, data, hasNextPage });
    } catch (error) {
      dispatch(paymentsErrored({ error }));
      return Promise.reject(error);
    }
  };
};
