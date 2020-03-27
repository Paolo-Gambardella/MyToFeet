import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import {
  createReduxContainer,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import AppNavigator from '../navigators/Start';
import appReducer from '../reducers';

const middleware = createReactNavigationReduxMiddleware(state => state.nav);

const Root = createReduxContainer(AppNavigator, 'root');

const initMiddleware = () => {
  // eslint-disable-next-line no-undef
  if (__DEV__) {
    return applyMiddleware(thunk, middleware);
  }
  return applyMiddleware(thunk, middleware);
};

const store = createStore(appReducer, initMiddleware());

export { store, Root };
