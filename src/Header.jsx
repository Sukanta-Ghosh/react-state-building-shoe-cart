import React from "react";
import {Link, NavLink} from "react-router-dom"

const activeStyle = {
  color: "purple",
}

export default function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/"><img alt="Carved Rock Fitness" src="/images/logo.png" /></Link>           
          </li>
          <li>
            <NavLink to="/shoes" >Shoes</NavLink>  {/*TODO: activeStyle={activeStyle} property causing error */}         
          </li>
          <li>
            <NavLink to="/cart" >Cart</NavLink>   {/*TODO: activeStyle={activeStyle} property causing error */}          
          </li>
        </ul>
      </nav>
    </header>
  );
}
