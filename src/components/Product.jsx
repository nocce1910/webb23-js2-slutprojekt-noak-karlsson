import React, { useEffect, useState } from "react";
import { groupItemsById } from "./Utils";

const Product = ({ name, image, price, stock, onAddToCart, cart }) => {
  const [quantity, setQuantity] = useState(0);
  const [noQuantity, setNoQuantity] = useState(false);

  useEffect(() => {
    const itemsWithSpecificName = Object.values(cart).filter(
      (item) => item.name === name
    );
    setQuantity(itemsWithSpecificName.length);
  }, []);

  const addToCart = () => {
    if (stock > 0) {
      if (quantity < stock) {
        onAddToCart({ name, price, image, stock });
        setQuantity(quantity + 1);
      } else {
        setNoQuantity(true);
      }
    }
  };

  return (
    <div className="product">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>Pris: {price} kr</p>
      <p>Lagersaldo: {stock}</p>
      {noQuantity && <h3> slut på lagret</h3>}
      <button onClick={addToCart} disabled={noQuantity}>
        Lägg till i kundvagn
      </button>
      <p>Antal i kundvagn: {quantity}</p>
    </div>
  );
};

export default Product;
