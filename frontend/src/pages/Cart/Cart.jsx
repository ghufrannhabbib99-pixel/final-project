import { useState } from "react";

function Cart() {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    return savedCart;
  });

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      return;
    }

    const updatedCart = cartItems.map((item) =>
      item.id === productId
        ? {
            ...item,
            quantity: newQuantity,
          }
        : item
    );

    setCartItems(updatedCart);
    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter(
      (item) => item.id !== productId
    );

    setCartItems(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  const total = cartItems.reduce(
    (sum, item) =>
      sum + Number(item.price) * item.quantity,
    0
  );

  return (
    <div>
      <h1>Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id}>
              <h3>{item.name}</h3>

              <p>
                Price: {item.price}
              </p>

              <div>
                <button
                  type="button"
                  onClick={() =>
                    updateQuantity(
                      item.id,
                      item.quantity - 1
                    )
                  }
                >
                  -
                </button>

                <span> {item.quantity} </span>

                <button
                  type="button"
                  onClick={() =>
                    updateQuantity(
                      item.id,
                      item.quantity + 1
                    )
                  }
                >
                  +
                </button>
              </div>

              <p>
                Subtotal:{" "}
                {Number(item.price) * item.quantity}
              </p>

              <button
                type="button"
                onClick={() =>
                  removeFromCart(item.id)
                }
              >
                Remove
              </button>

              <hr />
            </div>
          ))}

          <h2>
            Total: {total}
          </h2>
        </div>
      )}
    </div>
  );
}

export default Cart;