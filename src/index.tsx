import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import logger from "redux-logger";
import reducers from "./store/reducers";
import { ProductList } from "./components/ProductList";

const store = configureStore({
  reducer: reducers,
  middleware: [thunk, logger],
});

ReactDOM.render(
    <Provider store={store}>
        <ProductList />
    </Provider>,
  document.getElementById("root"),
);