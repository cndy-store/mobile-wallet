import { combineReducers } from 'redux';
import keypair from './keypair';
import account from './account';

export default combineReducers({
  account,
  keypair
});
