import React, { useMemo } from "react";
import {useNavigate} from "react-router-dom"
import useFetchAll from "./services/useFetchAll";
import Spinner from "./Spinner";

export default function Cart({ cart, updateQuantity }) {
  const navigate = useNavigate()
  const urls = cart.map((i) => `products/${i.id}`);
  const { data: products, loading, error } = useFetchAll(urls);

  function renderItem(itemInCart) {
    /* Destructure the value stored in cart */
    const { id, sku, quantity } = itemInCart;
    /* Find the product details for that item and destuructute 
    the other product details that will be displayed below */
    const { price, name, image, skus } = products.find(
      (p) => p.id === parseInt(id)
    );
    /* Find associated size for the sku so that we can display
    the selected size  */
    const { size } = skus.find((s) => s.sku === sku);

    return (
      <li key={sku} className="cart-item">
        <img src={`/images/${image}`} alt={name} />
        <div>
          <h3>{name}</h3>
          <p>${price}</p>
          <p>Size: {size}</p>
          <p>
            {/* Dropdown to changing the quantity which uses update quantity prop */}
            <select
              aria-label={`Select quantity for ${name} size ${size}`}
              onChange={(e) => updateQuantity(sku, parseInt(e.target.value))}
              value={quantity}
            >
              <option value="0">Remove</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </p>
        </div>
      </li>
    );
  }

  /* Must be declared above the returns below since hooks can't be called conditionaly.
  With useMemo value will only recalculated if the dependency changed.*/
  const numItemsInCart = useMemo(
      () => cart.reduce((total, item) => total + item.quantity,0)
      , [cart]
    );

  if (loading) return <Spinner />;
  if (error) throw error;

  //In order to improve performance we use memo hook before conditional statements
  //const numItemsInCart = cart.reduce((total, item) => total + item.quantity,0)

  return (
    <section id="cart">
      <h1>{numItemsInCart === 0 ? "Cart is empty" : `${numItemsInCart} items in your cart`}</h1>
      <ul>{cart.map(renderItem)}</ul>
      {cart.length > 0 &&(<button className="btn btn-primary" onClick={() => navigate("/checkout")}>Checkout</button>)}
    </section>
  );
}
