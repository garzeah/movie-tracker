import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

import App from "./components/App";
import reducers from "./reducers";

// Creating our Redux store
// 2nd arg. is initial state of application (usually used for server side rendering)
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  // Provider makes store available to every component
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
