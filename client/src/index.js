import React from "react";
import { createRoot } from "react-dom/client";

import axios from 'axios';
import { Provider } from 'react-redux'
import { PersistGate } from "redux-persist/integration/react";

import './index.css'
import App from "./App";
import { store, persistor } from "./state/store";

axios.defaults.baseURL = "http://localhost:5555"
axios.defaults.withCredentials = true;

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
);