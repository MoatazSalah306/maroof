
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './slices/authSlice';
import donationsReducer from './slices/donationsSlice';
import activitiesReducer from './slices/activitiesSlice';
import educationReducer from './slices/educationSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'donations', 'activities', 'education'], // persist these reducers
};

const rootReducer = combineReducers({
  auth: authReducer,
  donations: donationsReducer,
  activities: activitiesReducer,
  education: educationReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
