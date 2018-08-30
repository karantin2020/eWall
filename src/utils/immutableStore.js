import Immutable from 'immutable';
import { combineReducers, createStore, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';

export let flatReducer = (state = Immutable.Map({}), action) => {
  if (action && action.error) {
    return state;
  } else {
    let payload = action.payload;
    let keyPath = action.meta && action.meta.path;
    let method = action.type;
    if (payload && keyPath && method) {
      return state[method] && state[method](keyPath, payload);
    } else if (method === 'deleteIn') {
      return state[method] && state[method](keyPath);
    } else if (!payload && method === 'setIn') {
      return (
        state[method] &&
        state[method](keyPath, typeof payload === 'string' ? '' : null)
      );
    } else {
      return state;
    }
  }
};

// let logger = store => next => action => {
//   console.log(action.type);
//   console.log('dispatching', store.getState());
//   let result = next(action);
//   console.log('next state', store.getState());
//   console.log(action.type);
//   return result;
// };

let createStoreWithMiddleware = applyMiddleware(
  thunk
  // logger
)(createStore);

export let handleStore = (store, path) => {
  return () =>
    store
      .getState()
      .getIn(path)
      .toJS();
};

export let flatReducers = function(reducers, api_state) {
  return createStoreWithMiddleware(
    combineReducers({ flatReducer, ...reducers }),
    api_state
  );
};

let flatStore = function(api_state) {
  let state = api_state;
  if (!Immutable.isImmutable(api_state)) {
    state = Immutable.fromJS(api_state);
  }
  return createStoreWithMiddleware(flatReducer, state);
};

export default flatStore;
