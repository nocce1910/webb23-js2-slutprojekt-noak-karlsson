import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { Navbar } from "./components/Navbar";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import { amountInCart } from "./components/Utils";
import { productsData } from "./components/backend/database";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState(productsData);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const onPurchase = (cart) => {
    const tmpProducts = [...products];

    cart.forEach((cartItem) => {
      const productIndex = tmpProducts.findIndex(
        (product) => product.name === cartItem.name
      );

      if (productIndex !== -1) {
        tmpProducts[productIndex].stock -= 1;
      }
    });

    setProducts(tmpProducts);

    alert("Köpet har genomförts!");
    setCurrentPage("home");
    setCart([]);
  };

  const onEmptyCart = () => {
    setCart([]);
  };

  const onAddToCart = (product) => {
    setCart([...cart, product]);
  };

  const onRemoveFromCart = (product) => {
    const updatedCart = cart.filter((item) => item.name !== product.name);
    setCart(updatedCart);
  };

  const onRemoveOneFromCart = (product) => {
    const index = cart.findIndex((item) => item.name === product.name);

    if (index !== -1) {
      const updatedCart = [...cart];
      updatedCart.splice(index, 1);
      setCart(updatedCart);
    }
  };

  return (
    <div>
      <Navbar onPageChange={handlePageChange} amount={amountInCart(cart)} />
      {currentPage === "home" && (
        <ProductList
          productsdata={products}
          onAddToCart={onAddToCart}
          cart={cart}
          onRemoveFromCart={onRemoveFromCart}
          onRemoveOneFromCart={onRemoveOneFromCart}
        />
      )}

      {currentPage === "cart" && (
        <Cart
          cart={cart}
          onPurchase={onPurchase}
          onEmptyCart={onEmptyCart}
          onRemoveOneFromCart={onRemoveOneFromCart}
          onAddToCart={onAddToCart}
          onRemoveFromCart={onRemoveFromCart}
        />
      )}
    </div>
  );
}

const root = createRoot(document.querySelector("#root"));
root.render(<App />);
