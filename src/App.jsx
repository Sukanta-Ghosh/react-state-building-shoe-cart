 import React from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import {Routes, Route} from "react-router-dom"
import Products from "./Products";
import Detail from "./Detail";
import Cart from "./Cart";

export default function App() {
    

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
            </Routes>   
        </main>
      </div>
      <Footer />
    </>
  );
}
