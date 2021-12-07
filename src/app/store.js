import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import devicesReducer from '../features/device/devicesSlice';

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  devices: devicesReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
})

export const persistor = persistStore(store)
