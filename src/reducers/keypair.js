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
      return Object.assign({}, state, { isProcessing: action.isProcessing });
    case KEYPAIR_ERROR:
      return Object.assign({}, state, { error: action.error });
    case KEYPAIR_LOAD:
    case KEYPAIR_SAVE:
    case KEYPAIR_REMOVE:
      return Object.assign({}, state, {
        keypair: action.keypair,
        error: action.error
      });
    default:
      return state;
  }
}
