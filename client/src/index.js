import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import { Provider } from 'react-redux'

import './index.css'
import App from "./App";
import { store } from "./state/store";

axios.defaults.baseURL = "http://localhost:5555"

const NODE_MOUNT = document.getElementById("root");

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    NODE_MOUNT
);