import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import  {persistReducer, persistStore}  from 'redux-persist'
import  store  from './redux/features/store.ts'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'

const persistConfiguration = {
    key: 'root',
    version: 1,
    storage: localStorage,
}

const persistedReducer = persistReducer(persistConfiguration, store)
const configStore = configureStore({
    reducer: persistedReducer,
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
