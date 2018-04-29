import { combineReducers } from 'redux';
import keypair from './keypair';
import account from './account';
import payments from './payments';

export default combineReducers({
  account,
  keypair,
  payments
});
