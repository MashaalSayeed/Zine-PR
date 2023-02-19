import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import { Provider } from 'react-redux'
import { PersistGate } from "redux-persist/integration/react";

import './index.css'
import App from "./App";
import { store, persistor } from "./state/store";

axios.defaults.baseURL = "http://localhost:5555"

const NODE_MOUNT = document.getElementById("root");

ReactDOM.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>, 
    NODE_MOUNT
);