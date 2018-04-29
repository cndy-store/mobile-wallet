import {
  PAYMENTS_STARTS_PROCESSING,
  PAYMENTS_ERROR,
  PAYMENTS_LOAD
} from '../actions/payments';

const defaultState = {
  isProcessing: false,
  error: null,
  payments: [],
  firstPageLoaded: false,
  hasNextPage: false,
  data: null
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
    case PAYMENTS_LOAD:
      return {
        ...state,
        payments: action.payments,
        data: action.data,
        firstPageLoaded: action.firstPageLoaded,
        hasNextPage: action.hasNextPage,
        error: action.error,
        isProcessing: action.isProcessing
      };
    default:
      return state;
  }
}
