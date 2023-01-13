import * as React from "react";
import * as ReactDOM from "react-dom";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import logger from "redux-logger";
import reducers from "./store/reducers";
import { ProductList } from "./components/ProductList";
import { Product } from "./components/Product";
import { Cart } from "./components/Cart";

const store = configureStore({
  reducer: reducers,
  middleware: [thunk, logger],
});

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/products/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart userId={1} />} />
        <Route path="/" element={<ProductList />} />
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root"),
);