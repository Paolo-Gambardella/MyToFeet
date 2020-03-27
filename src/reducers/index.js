import { combineReducers } from 'redux';
import navigation from './navigation';
import register from './register';
import loading from './loading';
import user from './user';
import alert from './alert';
import analyse from './analyse';

const appReducer = combineReducers({
  nav: navigation,
  register,
  loading,
  user,
  alert,
  analyse,
});

export default appReducer;
