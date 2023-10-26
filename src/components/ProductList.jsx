import React, { useState } from "react";
import Product from "./Product";
import "../style/ProductList.css";

const ProductList = ({ onAddToCart, cart, productsdata }) => {
  const [products, setProducts] = useState(productsdata);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const onAddToCartLocal = (product) => {
    onAddToCart(product);
  };

  const onRemoveOneFromCart = (product) => {
    const updatedCart = [...cart];
    const index = updatedCart.findIndex((item) => item.name === product.name);

    if (index !== -1) {
      updatedCart[index].quantity -= 1;
      if (updatedCart[index].quantity === 0) {
        updatedCart.splice(index, 1);
      }
      setCart(updatedCart);
    }
  };

  const onSearchChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearch(searchTerm);
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm)
    );
    setProducts(filteredProducts);
  };

  const sortProducts = () => {
    const sortedProducts = [...products];
    if (sortOrder === "asc") {
      sortedProducts.sort((a, b) => a.price - b.price);
      setSortOrder("desc");
    } else {
      sortedProducts.sort((a, b) => b.price - a.price);
      setSortOrder("asc");
    }
    setProducts(sortedProducts);
  };

  return (
    <div className="product-list">
      <div className="search">
        <input
          type="text"
          placeholder="Sök produkter"
          value={search}
          onChange={onSearchChange}
        />
        <button onClick={sortProducts}>
          {sortOrder === "asc" ? "Sortera stigande" : "Sortera fallande"}
        </button>
      </div>
      <div className="products">
        {products.map((product, index) => (
          <Product
            cart={cart}
            key={index}
            {...product}
            onAddToCart={onAddToCartLocal} // Anropa den lokala funktionen för att lägga till i kundvagnen
            onRemoveOneFromCart={onRemoveOneFromCart}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
