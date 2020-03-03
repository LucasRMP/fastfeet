import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

function persistReducers(reducers) {
  const options = {
    key: 'fastfeet',
    storage,
    whitelist: ['auth'],
  };

  const persistedReducer = persistReducer(options, reducers);

  return persistedReducer;
}

export default persistReducers;
