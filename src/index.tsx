import * as React from "react";
import * as ReactDOM from "react-dom";
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import reducers from "./store/reducers";
import { ProductList } from "./components/ProductList";

const store = configureStore({
  reducer: reducers,
  middleware: [thunk],
});

ReactDOM.render(
    <div>
        <ProductList />
    </div>,
  document.getElementById("root"),
);