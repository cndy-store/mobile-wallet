import { getItem, setItem, removeItem } from '../lib/keypairStorage';
import { isValidSecret } from '../lib/keypairHelpers';
import { StellarSdk } from '../lib/stellar';

const { Keypair } = StellarSdk;
const STORAGE_KEY = 'STELLAR_SECRET';

export const KEYPAIR_STARTS_PROCESSING = 'KEYPAIR_STARTS_PROCESSING';
export const KEYPAIR_ERROR = 'KEYPAIR_ERROR';
export const KEYPAIR_LOAD = 'KEYPAIR_LOAD';
export const KEYPAIR_SAVE = 'KEYPAIR_SAVE';
export const KEYPAIR_REMOVE = 'KEYPAIR_REMOVE';

const chomp = str => str.replace(/\n|\r| /g, '');

export const keypairProcessing = bool => ({
  type: KEYPAIR_STARTS_PROCESSING,
  isProcessing: bool
});

export const keypairErrored = ({ error }) => ({
  type: KEYPAIR_ERROR,
  error,
  isProcessing: false
});

export const keypairLoadSucceded = ({ keypair }) => ({
  type: KEYPAIR_LOAD,
  keypair,
  error: null,
  isProcessing: false
});

export const keypairSaveSucceded = ({ keypair }) => ({
  type: KEYPAIR_SAVE,
  keypair,
  error: null,
  isProcessing: false
});

export const keypairRemoveSucceded = () => ({
  type: KEYPAIR_REMOVE,
  keypair: null,
  error: null,
  isProcessing: false
});

export const loadKeypair = () => {
  return async dispatch => {
    dispatch(keypairProcessing(true));
    try {
      const secret = await getItem(STORAGE_KEY);
      const keypair = secret ? Keypair.fromSecret(secret) : null;
      dispatch(keypairLoadSucceded({ keypair }));
      return Promise.resolve({ keypair });
    } catch (error) {
      dispatch(keypairErrored({ error }));
      return Promise.reject(error);
    }
  };
};

export const saveKeypair = secretString => {
  const secret = chomp(secretString);

  return async dispatch => {
    dispatch(keypairProcessing(true));

    if (!isValidSecret(secret)) {
      const error = new Error('Invalid Secret');
      dispatch(keypairErrored({ error }));
      return Promise.reject(error);
    }

    try {
      await setItem(STORAGE_KEY, secret);
      const keypair = Keypair.fromSecret(secret);
      dispatch(keypairSaveSucceded({ keypair }));
      return Promise.resolve({ keypair });
    } catch (error) {
      dispatch(keypairErrored({ error }));
      return Promise.reject(error);
    }
  };
};

export const removeKeypair = () => {
  return async dispatch => {
    dispatch(keypairProcessing(true));

    try {
      await removeItem(STORAGE_KEY);
      dispatch(keypairRemoveSucceded());
      return Promise.resolve();
    } catch (error) {
      dispatch(keypairErrored({ error }));
      return Promise.reject(error);
    }
  };
};
