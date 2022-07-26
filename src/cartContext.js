import React, { useReducer, useEffect, useContext } from "react";
import cartReducer from "./cartReducer";

/* The default would apply if a component tries consuming the context without
a provider in a parent. */
const CartContext = React.createContext(null);

let initialCart;
//If json is malformed.
try {
    /* ?? is Nullish coalescing operator:
      If the left-hand side is null or undefined, use
      the value on the right. */
  initialCart = JSON.parse(localStorage.getItem("cart")) ?? [];
} catch {
  console.error("The cart could not be parsed into JSON.");
  //Return empty array so that application can load
  initialCart = [];
}

export function CartProvider(props) {
    //Need to initialize cart using localStorage
  //Default values are evaluated on every render 
  /* Declare the default using a function. Function are lazy evaluated. The function will only be run
  the first time the component renders. */
  const [cart, dispatch] = useReducer(cartReducer, initialCart);

  //Anytime the cart changes, store it in localstorage as a JSON string. Use "cart" as key. 
  useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)), [cart]);
  const contextValue = {
    cart,
    dispatch,
  };
  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error(
      "useCart must be used within a CartProvider. Wrap a parent component in <CartProvider> to fix this error."
    );
  }
  return context;
}
