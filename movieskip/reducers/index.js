import { combineReducers } from 'redux';
import auth from './auth_reducer';
import filter from './filter_reducer';
import list from './list_reducer';

export default combineReducers({
  auth, filter, list
});
