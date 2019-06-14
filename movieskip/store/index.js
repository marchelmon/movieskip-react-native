import thunk from 'redux-thunk';
import { createStore, compose, applyMiddleware } from 'redux';
//import { logger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import reducers from '../reducers';
import { handleFilter } from './handleFilter';
import { handleList } from './handleList';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['filter', 'list'],
  stateReconciler: autoMergeLevel2
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = createStore(
    persistedReducer,
    {},
    compose(
      applyMiddleware(thunk, handleFilter, handleList)
    )
  );
  export const persistor = persistStore(store);
