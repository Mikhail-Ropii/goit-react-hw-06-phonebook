import { configureStore } from '@reduxjs/toolkit';
import { contactsSlice, filterSlice } from './Slices';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedContactsReducer = persistReducer(
  persistConfig,
  contactsSlice.reducer
);

export const store = configureStore({
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  reducer: {
    items: persistedContactsReducer,
    filter: filterSlice.reducer,
  },
});
export const persistor = persistStore(store);
