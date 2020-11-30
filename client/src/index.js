import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";

import App from "./components/App";
import reducers from "./reducers";

// Creating our Redux store
// 2nd arg. is initial state of application (usually used for server side rendering)
const store = createStore(reducers, {}, applyMiddleware());

ReactDOM.render(
  // Provider makes store available to every component
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
