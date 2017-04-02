/* global window */
/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware, compose } from 'redux';
import reducer from '../reducers';

const getHydratedStore = (middleWare) => {
  let preloadedState = {};
  if (window.__PRELOADED_STATE__) {
    preloadedState = Object.assign({}, window.__PRELOADED_STATE__);
  }

  // Use Redux Dev Tools, if available
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = middleWare ?
      createStore(reducer, preloadedState, composeEnhancers(applyMiddleware(middleWare))) :
      createStore(reducer, preloadedState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

  delete window.__PRELOADED_STATE__;
  return store;
};

const hydrateStore = state => (createStore(reducer, state));

export {
  hydrateStore,
  getHydratedStore,
};
