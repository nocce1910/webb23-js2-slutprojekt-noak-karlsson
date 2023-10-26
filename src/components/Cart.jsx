import React from "react";
import "../style/Cart.css";
import { groupItemsById } from "./Utils";

const Cart = ({
  cart,
  onPurchase,
  onEmptyCart,
  onRemoveOneFromCart,
  onRemoveFromCart,
  onAddToCart,
}) => {
  const getTotalPrice = () => {
    const listWithProductList = groupItemsById(cart);

    let totalPrice = 0;

    Object.values(listWithProductList).forEach((group) => {
      group.forEach((product) => {
        totalPrice += product.price;
      });
    });

    return totalPrice;
  };

  const getTotalQuantity = () => {
    return cart.reduce((total, product) => total + product.stock, 0);
  };

  const uniqueCartItems = [
    ...new Map(cart.map((item) => [item.name, item])).values(),
  ];

  return (
    <div>
      <h2>Kundvagn</h2>
      {cart.length === 0 ? (
        <p>Din kundvagn är tom.</p>
      ) : (
        <div>
          {Object.keys(groupItemsById(cart)).map((id) => {
            const product = groupItemsById(cart)[id][0];
            const amount = groupItemsById(cart)[id].length;
            return (
              <div key={id}>
                <ul>
                  <li>
                    <div className="cart-item">
                      <img
                        style={{ width: "200px" }}
                        src={product.image}
                        alt={product.name}
                      />
                      <div className="cart-item-details">
                        <p>{product.name}</p>
                        <p>Pris: {product.price} kr</p>
                        <p>Lagersaldo: {product.stock}</p>
                        <p>Antal i kundvagn: {amount}</p>
                        <div className="cart-item-controls">
                          <button onClick={() => onRemoveFromCart(product)}>
                            Ta bort
                          </button>
                          <div className="quantity-controls">
                            <button
                              onClick={() => {
                                if (amount > 1) {
                                  onRemoveOneFromCart(product);
                                }
                              }}
                            >
                              -
                            </button>
                            <span>{product.quantity}</span>
                            <button
                              onClick={() => {
                                if (amount < product.stock) {
                                  onAddToCart(product);
                                }
                              }}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            );
          })}
          <p>Totalt pris: {getTotalPrice()} kr</p>
          <button onClick={() => onPurchase(cart)}>Genomför köp</button>
          <button onClick={onEmptyCart}>Töm kundvagn</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
