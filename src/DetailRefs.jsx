/* This file is alternate to Detail.jsx. Here we will use concept of Uncontrolled Components.
Uncontrolled inputs give us less power. React doesn't re-render when refs change.*/
import React, { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PageNotFound from "./PageNotFound";
import useFetch from "./services/useFetch";
import Spinner from "./Spinner";

export default function Detail({addToCart}) {
    const {id} = useParams();
    const skuRef = useRef();
    const {data: product, error, loading} = useFetch(`products/${id}`)
    const navigate = useNavigate()

    if(loading) return <Spinner/>
    if(!product) return <PageNotFound/>
   if(error) throw error;

    return (
        <div id="detail">
        <ToastContainer/>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p id="price">${product.price}</p>
        {/* The skuRef variable holds a reference to this select HTML input.
        With uncontrolled inputs, the HTML input holds the value. The HTML 
        input is the source of truth instead of React's state.*/}
        <select id="size" 
        ref={skuRef} 
        >
            <option value="">What size?</option>
            {product.skus.map((s) => (
                <option key={s.sku} value={s.sku}>
                    {s.size}
                </option>
            ))}
        </select>
        <p>
            <button 
            className="btn btn-primary" 
            onClick={() => {
                /* Read the value from input. Current property represents html element */
                const sku = skuRef.current.value;
                if(!sku) return alert("Select size.") 
                addToCart(id, sku)
               toast.success("Item added")
            }}
            >Add to cart</button>
            <button className="btn btn-primary" onClick={() => navigate("/cart")}>Go to cart</button>
        </p>
        <img src={`/images/${product.image}`} alt={product.category} width="25%" height="25%"/>
        </div>
    );
}
