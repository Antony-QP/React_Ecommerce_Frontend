import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import 'antd/dist/antd.css'

// Redux
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
// Reducers
import rootReducer from './reducers'

// Create store
const store = createStore(rootReducer, composeWithDevTools())

ReactDOM.render(

    <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </Provider>,
  document.getElementById("root")
);

reportWebVitals();
