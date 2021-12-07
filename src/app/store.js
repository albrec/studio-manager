import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import devicesReducer from '../features/device/devicesSlice'
import linksReducer from '../features/matrix/linkSlice'

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  devices: devicesReducer,
  links: linksReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
})

export const persistor = persistStore(store)
