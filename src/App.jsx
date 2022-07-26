 import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Detail from "./Detail";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products";



export default function App() {
    /* function addToCart(id, sku)::
      //React will provide the current state as the argument to this function
      //Whatever is returned from this function becomes the new state.

      /* We are updating state using existing state, so we're using the 
      function form of set state. items represents the current cart state.
      It's provided by React. */
      
    /* Refer function emptyCart(): 
    Principle of Least Privilege: Components should only be
    provided what they need.  */
    

  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
              <Route path="/" element={<h1>Welcome to Ecommerce Site</h1>}/> 
              <Route path="/:category" element={<Products/>}/> 
              <Route path="/:category/:id" element={<Detail/>}/> 
              <Route path="/cart" element={<Cart/>}/> 
              <Route path="/checkout" element={<Checkout/>}/> 
            </Routes>   
        </main>
      </div>
      <Footer />
    </>
  );
}
