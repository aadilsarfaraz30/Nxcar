import { configureStore } from '@reduxjs/toolkit';
import persistedReducer from './rootReducer';
import persistStore from 'redux-persist/es/persistStore';

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NEXT_PUBLIC_NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
    immutableCheck: false,
  })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof persistedReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];

