import { map, uniq, without } from 'lodash';
import {
  PAYMENTS_STARTS_PROCESSING,
  PAYMENTS_ERROR,
  PAYMENTS_LOAD,
  PAYMENTS_MARK_AS_SEEN
} from '../actions/payments';

const defaultState = {
  isProcessing: false,
  error: null,
  payments: [],
  firstPageLoaded: false,
  hasNextPage: false,
  data: null,
  lastPagingToken: null,
  unseenPaymentIds: []
};

const extractLastPagingToken = payments => {
  if (!payments.length) return null;
  // take the first one because of descending order
  return payments[0].paging_token;
};

const unseenPaymentIds = (
  existingUnseenIds,
  wasFirstPageLoaded,
  oldPayments,
  newPayments
) => {
  if (!wasFirstPageLoaded) return [];

  const oldPaymentIds = map(oldPayments, 'id');
  const newPaymentIds = map(newPayments, 'id');
  const newUnseenIds = without(newPaymentIds, ...oldPaymentIds);

  return uniq([...existingUnseenIds, ...newUnseenIds]);
};

export default function payments(state = defaultState, action) {
  switch (action.type) {
    case PAYMENTS_STARTS_PROCESSING:
      return { ...state, isProcessing: action.isProcessing };
    case PAYMENTS_ERROR:
      return {
        ...state,
        error: action.error,
        isProcessing: action.isProcessing
      };
    case PAYMENTS_MARK_AS_SEEN:
      return {
        ...state,
        unseenPaymentIds: without(state.unseenPaymentIds, action.paymentId)
      };
    case PAYMENTS_LOAD:
      return {
        ...state,
        payments: action.payments,
        data: action.data,
        firstPageLoaded: action.firstPageLoaded,
        hasNextPage: action.hasNextPage,
        error: action.error,
        isProcessing: action.isProcessing,
        lastPagingToken: extractLastPagingToken(action.payments),
        unseenPaymentIds: unseenPaymentIds(
          state.unseenPaymentIds,
          state.firstPageLoaded,
          state.payments,
          action.payments
        )
      };
    default:
      return state;
  }
}
