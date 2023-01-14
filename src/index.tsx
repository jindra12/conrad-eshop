import * as React from "react";
import * as ReactDOM from "react-dom";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import logger from "redux-logger";
import reducers from "./store/reducers";
import { ProductList } from "./components/ProductList";
import { Cart } from "./components/Cart";
import { ProductContainer } from "./components/ProductContainer";

import "../scss/main.scss";

const store = configureStore({
  reducer: reducers,
  middleware: [thunk, logger],
});

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/products/:productId" element={<ProductContainer />} />
        <Route path="/cart" element={<Cart userId={1} />} />
        <Route path="/" element={<ProductList />} />
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root"),
);