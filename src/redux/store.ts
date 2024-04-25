import {configureStore, combineReducers} from "@reduxjs/toolkit"
import { todoReducer } from "./slices"
import { 
    persistStore, 
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducers = combineReducers({
    todoReducer
})

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducers)


const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

type RootState = ReturnType<typeof rootReducers>
type AppStore = typeof store;
type AppDispatch = AppStore['dispatch']

export type {
    RootState,
    AppDispatch
}

const persisted = persistStore(store)

export {
    store,
    persisted
}