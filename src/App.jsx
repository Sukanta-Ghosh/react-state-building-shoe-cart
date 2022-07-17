 import React, { useState } from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import useFetch from "./services/useFetch";
import Spinner from "./Spinner";

export default function App() {
    //size state for holding no of items desplayed
    const [size, setSize] = useState("");
 
    //data is alias to product by :
    const { data:products, loading, error } = useFetch(
      "products?category=shoes"
    ); 

  function renderProduct(p) {
    return (
      <div key={p.id} className="product">
        <a href="/">
          <img src={`/images/${p.image}`} alt={p.name} />
          <h3>{p.name}</h3>
          <p>${p.price}</p>
        </a>
      </div>
    );
  }

  
  const filteredProducts = size ? products.filter(p => p.skus.find(s => s.size === parseInt(size))) : products  

  if(error){ console.log(error); throw error;}
  if(loading) return <Spinner/>

  return (
    <>
      <div className="content">
        <Header />
        <main>
          <section id="filters"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          >
            <label htmlFor="size">Filter by Size:</label>{" "}
            <select id="size">
              <option value="">All sizes</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
            </select>
          </section>
          <h2>{filteredProducts.length} items found</h2>
          <section id="products">
            {filteredProducts.map(renderProduct)}
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}
