import {
  KEYPAIR_STARTS_PROCESSING,
  KEYPAIR_ERROR,
  KEYPAIR_LOAD,
  KEYPAIR_SAVE,
  KEYPAIR_REMOVE
} from '../actions/keypair';

const defaultState = {
  isProcessing: false,
  error: null,
  keypair: null
};

export default function keypair(state = defaultState, action) {
  switch (action.type) {
    case KEYPAIR_STARTS_PROCESSING:
      return { ...state, isProcessing: action.isProcessing };
    case KEYPAIR_ERROR:
      return {
        ...state,
        error: action.error,
        isProcessing: action.isProcessing
      };
    case KEYPAIR_LOAD:
    case KEYPAIR_SAVE:
    case KEYPAIR_REMOVE:
      return {
        ...state,
        keypair: action.keypair,
        error: action.error,
        isProcessing: action.isProcessing
      };
    default:
      return state;
  }
}
