import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";

import memory from "./utils/memory";
import storage from "./utils/storage";

const user = storage.getUser();
if(user._id)
    memory.user = user;

ReactDOM.render(<App />, document.querySelector('#root'));
