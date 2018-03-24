import {
  ACCOUNT_STARTS_PROCESSING,
  ACCOUNT_ERROR,
  ACCOUNT_LOAD
} from '../actions/account';

const defaultState = {
  isProcessing: false,
  error: null,
  account: null,
  data: null
};

export default function account(state = defaultState, action) {
  switch (action.type) {
    case ACCOUNT_STARTS_PROCESSING:
      return { ...state, isProcessing: action.isProcessing };
    case ACCOUNT_ERROR:
      return {
        ...state,
        error: action.error,
        isProcessing: action.isProcessing
      };
    case ACCOUNT_LOAD:
      return {
        ...state,
        account: action.account,
        data: action.data,
        error: action.error,
        isProcessing: action.isProcessing
      };
    default:
      return state;
  }
}
