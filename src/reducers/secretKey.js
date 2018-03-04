import {
  SECRET_KEY_LOAD_START,
  SECRET_KEY_LOAD_ERROR,
  SECRET_KEY_LOAD_SUCCESS,
  SECRET_KEY_SAVE_START,
  SECRET_KEY_SAVE_ERROR
} from '../actions/secretKey';

export const secretKeyIsLoading = (state = false, action) => {
  switch (action.type) {
    case SECRET_KEY_LOAD_START:
      return action.isLoading;
    default:
      return state;
  }
};

export const secretKeyLoadError = (state = null, action) => {
  switch (action.type) {
    case SECRET_KEY_LOAD_ERROR:
      return action.error;
    default:
      return state;
  }
};

export const secretKeyIsSaving = (state = false, action) => {
  switch (action.type) {
    case SECRET_KEY_SAVE_START:
      return action.isLoading;
    default:
      return state;
  }
};

export const secretKeySaveError = (state = null, action) => {
  switch (action.type) {
    case SECRET_KEY_SAVE_ERROR:
      return action.error;
    default:
      return state;
  }
};

export const secretKey = (state = null, action) => {
  switch (action.type) {
    case SECRET_KEY_LOAD_SUCCESS:
      return action.secretKey;
    default:
      return state;
  }
};
