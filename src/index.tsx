import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { mainStore } from "./redux";
import "normalize.css";
import "./index.scss";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={mainStore}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
