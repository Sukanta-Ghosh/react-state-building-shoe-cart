import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { CartProvider } from "./cartContext";
import ErrorBoundary from "./ErrorBoundary";


ReactDOM.render(
  <ErrorBoundary>
    <BrowserRouter>
      <CartProvider>
        <App/>
      </CartProvider>
    </BrowserRouter>
  </ErrorBoundary>
  ,
  document.getElementById("root")
);
