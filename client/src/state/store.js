import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from "redux-persist";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist"

const reducers = combineReducers({
    auth: authSlice     
});
   
const persistedReducer = persistReducer({
    key: "root",
    whitelist: ["auth"],
    storage
}, reducers);

const store = configureStore({
    reducer: persistedReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
})

const persistor = persistStore(store);

export {
    store,
    persistor
}
