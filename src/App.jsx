 import React, { useEffect, useReducer } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Cart from "./Cart";
import cartReducer from "./cartReducer";
import Checkout from "./Checkout";
import Detail from "./Detail";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products";

let initialcart;
//If json is malformed.
try {
  /* ?? is Nullish coalescing operator:
      If the left-hand side is null or undefined, use
      the value on the right. */
  initialcart =  JSON.parse(localStorage.getItem("cart")) ?? []
} catch (error) {
  console.error("The cart could not be parsed into JSON.");
  //Return empty array so that application can load
  initialcart = [];
}

export default function App() {
  //Need to initialize cart using localStorage
  //Default values are evaluated on every render 
  /* Declare the default using a function. Function are lazy evaluated. The function will only be run
  the first time the component renders. */
    const [cart, dispatch] = useReducer(cartReducer, initialcart)

    //Anytime the cart changes, store it in localstorage as a JSON string. Use "cart" as key. 
    useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)),[cart])

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
              <Route path="/:category/:id" element={<Detail dispatch={dispatch}/>}/> 
              <Route path="/cart" element={<Cart cart={cart} dispatch={dispatch}/>}/> 
              <Route path="/checkout" element={<Checkout cart={cart} dispatch={dispatch}/>}/> 
            </Routes>   
        </main>
      </div>
      <Footer />
    </>
  );
}
