import { combineReducers } from 'redux';
import {
  secretKeyIsLoading,
  secretKeyLoadError,
  secretKeyIsSaving,
  secretKeySaveError,
  secretKey
} from './secretKey';

export default combineReducers({
  secretKeyIsLoading,
  secretKeyLoadError,
  secretKeyIsSaving,
  secretKeySaveError,
  secretKey
});
