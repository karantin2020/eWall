import Immutable from 'immutable';
import { combineReducers, createStore, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';

export function flatReducer (state = Immutable.Map({}), action) {
  if (action && action.error) {
    return state;
  } else {
    const payload = action.payload;
    const keyPath = action.meta && action.meta.path;
    const method = action.type;
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

// const logger = store => next => action => {
//   console.log(action.type);
//   console.log('dispatching', store.getState());
//   let result = next(action);
//   console.log('next state', store.getState());
//   console.log(action.type);
//   return result;
// };

const createStoreWithMiddleware = applyMiddleware(
  thunk
  // logger
)(createStore);

const flat_store = function(flatState) {
  return createStoreWithMiddleware(flatReducer, flatState);
};

export function flatReducers(reducers, flatState) {
  var keys = Object.keys(reducers)
  var store = {}
  for (var i =0; i < keys.length; i++) {
    store[keys[i]] = reducers[keys[i]]
  }
  store["flatReducer"] = flatState
  return createStoreWithMiddleware(
    combineReducers({ ...reducers, flatReducer })
  );
}

export default flat_store;

/* TESTS */
/*


*/
/* TESTS END */
