import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
// import { createStore, applyMiddleware, compose } from "redux";
// import thunk from "redux-thunk";

// import { reducers } from "./reducers";
// import { rootReducer } from "./store/rootReducer";
import store from "./store/store";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// const store = createStore(reducers, compose(applyMiddleware(thunk)));
// const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
