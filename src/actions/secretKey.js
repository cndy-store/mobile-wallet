import { AsyncStorage } from 'react-native';

const STORAGE_KEY = 'STELLAR_SECRET_KEY';

export const SECRET_KEY_LOAD_START = 'SECRET_KEY_LOAD_START';
export const SECRET_KEY_LOAD_ERROR = 'SECRET_KEY_LOAD_ERROR';
export const SECRET_KEY_LOAD_SUCCESS = 'SECRET_KEY_LOAD_SUCCESS';

export const SECRET_KEY_SAVE_START = 'SECRET_KEY_SAVE_START';
export const SECRET_KEY_SAVE_ERROR = 'SECRET_KEY_SAVE_ERROR';

export const secretKeyIsLoading = bool => ({
  type: SECRET_KEY_LOAD_START,
  isLoading: bool
});

export const secretKeyLoadHasErrored = ({ error }) => ({
  type: SECRET_KEY_LOAD_ERROR,
  error
});

export const secretKeyLoadSuceeded = ({ secretKey }) => ({
  type: SECRET_KEY_LOAD_SUCCESS,
  secretKey
});

export const secretKeyIsSaving = bool => ({
  type: SECRET_KEY_SAVE_START,
  isLoading: bool
});

export const secretKeySaveHasErrored = ({ error }) => ({
  type: SECRET_KEY_SAVE_ERROR,
  error
});

export const loadSecretKey = () => {
  return async dispatch => {
    dispatch(secretKeyIsLoading(true));
    try {
      const secretKey = await AsyncStorage.getItem(STORAGE_KEY);
      dispatch(secretKeyIsLoading(false));
      dispatch(secretKeyLoadSuceeded({ secretKey }));
      return Promise.resolve({ secretKey });
    } catch (error) {
      dispatch(secretKeyIsLoading(false));
      dispatch(secretKeyLoadHasErrored({ error }));
      return Promise.reject({ error });
    }
  };
};

export const saveSecretKey = secretKey => {
  return async dispatch => {
    dispatch(secretKeyIsSaving(true));

    try {
      await AsyncStorage.setItem(STORAGE_KEY, secretKey);
      dispatch(secretKeyIsSaving(false));
    } catch (error) {
      dispatch(secretKeyIsSaving(false));
      dispatch(secretKeySaveHasErrored({ error }));
    }
  };
};

export const deleteSecretKey = secretKey => {
  return async dispatch => {
    dispatch(secretKeyIsSaving(true));

    try {
      await AsyncStorage.removeItem(STORAGE_KEY, secretKey);
      dispatch(secretKeyIsSaving(false));
    } catch (error) {
      dispatch(secretKeyIsSaving(false));
      dispatch(secretKeySaveHasErrored({ error }));
    }
  };
};
