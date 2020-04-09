import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import {Provider} from 'react-redux'
import store from './redux/store'

import memory from "./utils/memory";
import storage from "./utils/storage";

const user = storage.getUser();
if(user._id)
    memory.user = user;

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.querySelector('#root'));
