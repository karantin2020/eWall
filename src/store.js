import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reducer as notificationsReducer } from 'reapop';
import Immutable from 'immutable';
import { flatReducer } from './utils/immutableStore.js';
// store
const createStoreWithMiddleware = compose(applyMiddleware(thunk))(createStore);
var store = Immutable.Map({});
export default createStoreWithMiddleware(
  combineReducers({
    // reducer must be mounted as `notifications` !
    notifications: notificationsReducer(),
    flatReducer
  }),
  { flatReducer: store }
);

// export default flatReducers(
//   {
//     // reapop reducer
//     notifications: notificationsReducer()
//   },
// );
