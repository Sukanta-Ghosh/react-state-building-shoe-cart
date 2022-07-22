 import React, { useState } from "react";
import "./App.css";
import useFetch from "./services/useFetch";
import Spinner from "./Spinner";
import {useParams,Link} from "react-router-dom"
import PageNotFound from "./PageNotFound";

export default function Products() {
    //size state for holding no of items desplayed
    const [size, setSize] = useState("");
    const {category} = useParams()
 
    //data is alias to product by :
    const { data:products, loading, error } = useFetch(
      "products?category="+category
    ); 

  function renderProduct(p) {
    return (
      <div key={p.id} className="product">
        <Link to={`/${category}/${p.id}`}>
          <img src={`/images/${p.image}`} alt={p.name} />
          <h3>{p.name}</h3>
          <p>${p.price}</p>
        </Link>
      </div>
    );
  }

  
  const filteredProducts = size ? products.filter(p => p.skus.find(s => s.size === parseInt(size))) : products  

  /* Multiple return statement act as guard clauses. These checks ensures necessary data is available.
  Returning early leads to writing less code and final/original return code also simplified. */
  if(error){ console.log(error); throw error;}
  if(loading) return <Spinner/>
  if(products.length === 0) return <PageNotFound/>

  return (
    <>  
        <section id="filters">
        <label htmlFor="size">Filter by Size:</label>{" "}
        <select id="size" value={size}
        onChange={(e) => setSize(e.target.value)}>
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
    </>
  );
}
