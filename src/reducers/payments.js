import { find, map, uniq, without } from 'lodash';
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

const unseenPaymentIds = ({
  publicKey,
  existingUnseenIds,
  wasFirstPageLoaded,
  oldPayments,
  newPayments
}) => {
  if (!wasFirstPageLoaded) return [];

  // Only payments from somebody else can be unseen
  const newPaymentsWhereCredited = newPayments.filter(p => p.to === publicKey);

  const oldPaymentIds = map(oldPayments, 'id');
  const newPaymentIds = map(newPaymentsWhereCredited, 'id');
  const newUnseenIds = without(newPaymentIds, ...oldPaymentIds);

  return uniq([...existingUnseenIds, ...newUnseenIds]);
};

export const selectFirstUnseenPayment = state => {
  if (!state.unseenPaymentIds.length) return null;

  const unseenPaymentId = state.unseenPaymentIds[0];
  const unseenPayment = find(state.payments, { id: unseenPaymentId });

  return unseenPayment;
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
        unseenPaymentIds: unseenPaymentIds({
          publicKey: action.publicKey,
          existingUnseenIds: state.unseenPaymentIds,
          wasFirstPageLoaded: state.firstPageLoaded,
          oldPayments: state.payments,
          newPayments: action.payments
        })
      };
    default:
      return state;
  }
}
