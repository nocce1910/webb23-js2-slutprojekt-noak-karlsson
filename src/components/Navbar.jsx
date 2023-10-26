import React from "react";
import "../style/Navbar.css";
import { amountInCart } from "./Utils";

export const Navbar = ({ onPageChange, amount }) => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <a href="#" onClick={() => onPageChange("home")}>
            MFF-Shoppen
          </a>
        </li>
        <li className="navbar-item">
          <a href="#" onClick={() => onPageChange("cart")}>
            Kundvagn ({amount})
          </a>
        </li>
      </ul>
    </nav>
  );
};
