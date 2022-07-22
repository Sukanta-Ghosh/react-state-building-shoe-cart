 import React, { useEffect, useState } from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import {Routes, Route} from "react-router-dom"
import Products from "./Products";
import Detail from "./Detail";
import Cart from "./Cart";

export default function App() {
  //Need to initialize cart using localStorage
  //Default values are evaluated on every render 
  /* Declare the default using a function. Function are lazy evaluated. The function will only be run
  the first time the component renders. */
    const [cart, setCart] = useState(() => {
      //If json is malformed.
      try {
        /* ?? is Nullish coalescing operator:
            If the left-hand side is null or undefined, use
            the value on the right. */
        return JSON.parse(localStorage.getItem("cart")) ?? []
      } catch (error) {
        console.error("The cart could not be parsed into JSON.");
        //Return empty array so that application can load
        return []
      }
      
    })

    //Anytime the cart changes, store it in localstorage as a JSON string. Use "cart" as key. 
    useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)),[cart])

    function addToCart(id, sku) {
      //React will provide the current state as the argument to this function
      //Whatever is returned from this function becomes the new state.
      /* We are updating state using existing state, so we're using the 
      function form of set state. items represents the current cart state.
      It's provided by React. */
      setCart((items) => {
        //Predicate: Fancy word for a function which returns either true or false.
        const itemInCart =  items.find((i) => i.sku === sku)  //If the sku is already in the cart, we need to increment the quantity by 1
        //itemInCart.quantity++;  //Don't do this
        if(itemInCart) {
          //Return new array with the matching item replaced
          return items.map((i) => i.sku === sku ? {...i, quantity: i.quantity + 1} : i)
        } else {
          //Return new array with the new item appended
          return [...items, {id, sku, quantity: 1}]
        }
      });
    }

    function updateQuantity(sku, quantity) {
        setCart((items) => {
          return quantity === 0 ? 
          items.filter((i) => i.sku !== sku) : 
          items.map((i) => i.sku === sku ? {...i, quantity} : i)}
      )
    }

  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
              <Route path="/" element={<h1>Welcome to Ecommerce Site</h1>}/> 
              <Route path="/:category" element={<Products/>}/> 
              <Route path="/:category/:id" element={<Detail addToCart={addToCart}/>}/> 
              <Route path="/cart" element={<Cart cart={cart} updateQuantity={updateQuantity}/>}/> 
            </Routes>   
        </main>
      </div>
      <Footer />
    </>
  );
}
