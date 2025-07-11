import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import storage from 'redux-persist/lib/storage' //  this is a wrapper over localStorage
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import  store  from './redux/features/store.ts'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'

const persistConfiguration = {
    key: 'root',
    version: 1,
    storage: storage,
}

const persistedReducer = persistReducer(persistConfiguration, store)
const configStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // 👇 Ignore redux-persist actions
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
const container = document.getElementById('root');
const root = container && createRoot(container);
let persistor = persistStore(configStore);

root?.render(
    <Provider store={configStore}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
);

// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";


// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <App/>
//   </React.StrictMode>
// );