import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import productImages from "../../data/productImages";
import "./Cart.css";

const Cart = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) || [];
    } catch {
      return [];
    }
  });

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const increaseQuantity = (productId) => {
    const updatedCart = cart.map((item) => {
      if (item.id !== productId) return item;

      if (item.quantity >= item.stock_quantity) {
        alert("Maximum available stock reached");
        return item;
      }

      return {
        ...item,
        quantity: item.quantity + 1,
      };
    });

    updateCart(updatedCart);
  };

  const decreaseQuantity = (productId) => {
    const updatedCart = cart
      .map((item) => {
        if (item.id !== productId) return item;

        return {
          ...item,
          quantity: item.quantity - 1,
        };
      })
      .filter((item) => item.quantity > 0);

    updateCart(updatedCart);
  };

  const removeItem = (productId) => {
    const updatedCart = cart.filter(
      (item) => item.id !== productId
    );

    updateCart(updatedCart);
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
    setCart([]);
  };

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (total, item) =>
      total + Number(item.price) * item.quantity,
    0
  );

  /* =====================================================
     EMPTY CART
     ===================================================== */

  if (cart.length === 0) {
    return (
      <main className="cart-page cart-empty-page">
        <div className="cart-decoration cart-decoration-one" />
        <div className="cart-decoration cart-decoration-two" />

        <div className="cart-container">
          <button
            onClick={() => navigate("/artisans")}
            className="cart-back-button"
          >
            <span>←</span>
            Back to Artisans
          </button>

          <section className="empty-cart-card">
            <div className="empty-cart-icon">
              <DotLottieReact
                src="/animations/shopping-cart.lottie"
                loop
                autoplay
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>

            <span className="empty-cart-eyebrow">
              ALHERFA COLLECTION
            </span>

            <h1>Your Cart is Empty</h1>

            <p>
              You haven't added any handcrafted products to your
              cart yet.
            </p>

            <button
              onClick={() => navigate("/artisans")}
              className="primary-cart-button"
            >
              Explore Artisans
              <span>→</span>
            </button>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <div className="cart-decoration cart-decoration-one" />
      <div className="cart-decoration cart-decoration-two" />

      <div className="cart-container">

        {/* =================================================
            HEADER
        ================================================= */}

        <header className="cart-header">
          <div className="cart-title-area">
            <span className="cart-eyebrow">
              ALHERFA COLLECTION
            </span>

            <div className="cart-title-row">
              <div className="cart-animation">
                <DotLottieReact
                  src="/animations/shopping-cart.lottie"
                  loop
                  autoplay
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              </div>

              <div>
                <h1>Shopping Cart</h1>

                <p>
                  You have{" "}
                  <strong>{totalItems}</strong>{" "}
                  {totalItems === 1 ? "item" : "items"} in
                  your cart
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={clearCart}
            className="clear-cart-button"
          >
            <span>×</span>
            Clear Cart
          </button>
        </header>

        {/* =================================================
            CART CONTENT
        ================================================= */}

        <div className="cart-layout">

          {/* PRODUCTS */}

          <section className="cart-products">

            <div className="cart-section-heading">
              <div>
                <span>YOUR SELECTION</span>
                <h2>Selected Products</h2>
              </div>

              <span className="cart-count-badge">
                {totalItems}{" "}
                {totalItems === 1 ? "item" : "items"}
              </span>
            </div>

            <div className="cart-items-list">

              {cart.map((item, index) => (
                <article
                  key={item.id}
                  className="cart-item"
                  style={{
                    animationDelay: `${index * 0.08}s`,
                  }}
                >

                  {/* IMAGE */}

                  <div className="cart-item-image">
                    {item.image ||
                    productImages[item.name] ? (
                      <img
                        src={
                          item.image ||
                          productImages[item.name]
                        }
                        alt={item.name}
                      />
                    ) : (
                      <div className="cart-fallback-icon">
                        🛍️
                      </div>
                    )}

                    <span className="cart-item-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* INFO */}

                  <div className="cart-item-content">

                    <div className="cart-item-top">

                      <div>
                        <span className="cart-item-label">
                          HANDCRAFTED PRODUCT
                        </span>

                        <h3>{item.name}</h3>

                        {item.craft_name && (
                          <p className="cart-craft-name">
                            {item.craft_name}
                          </p>
                        )}
                      </div>

                      <button
                        onClick={() =>
                          removeItem(item.id)
                        }
                        className="remove-cart-item"
                        title="Remove product"
                        aria-label={`Remove ${item.name}`}
                      >
                        ×
                      </button>

                    </div>

                    {item.description && (
                      <p className="cart-item-description">
                        {item.description}
                      </p>
                    )}

                    <div className="cart-item-bottom">

                      {/* QUANTITY */}

                      <div className="quantity-area">
                        <span className="quantity-label">
                          Quantity
                        </span>

                        <div className="quantity-control">

                          <button
                            onClick={() =>
                              decreaseQuantity(item.id)
                            }
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>

                          <span>{item.quantity}</span>

                          <button
                            onClick={() =>
                              increaseQuantity(item.id)
                            }
                            disabled={
                              item.quantity >=
                              item.stock_quantity
                            }
                            aria-label="Increase quantity"
                          >
                            +
                          </button>

                        </div>

                        {item.stock_quantity && (
                          <span className="stock-hint">
                            {item.stock_quantity} available
                          </span>
                        )}
                      </div>

                      {/* PRICE */}

                      <div className="cart-item-price">
                        <span>ITEM TOTAL</span>

                        <strong>
                          {(
                            Number(item.price) *
                            item.quantity
                          ).toLocaleString()}{" "}
                          IQD
                        </strong>

                        <small>
                          {Number(
                            item.price
                          ).toLocaleString()}{" "}
                          IQD each
                        </small>
                      </div>

                    </div>
                  </div>
                </article>
              ))}

            </div>
          </section>

          {/* =================================================
              ORDER SUMMARY
          ================================================= */}

          <aside className="cart-summary-wrapper">

            <div className="cart-summary">

              <div className="summary-top">
                <span>ORDER DETAILS</span>

                <div className="summary-symbol">
                  ✦
                </div>
              </div>

              <h2>Order Summary</h2>

              <div className="summary-divider" />

              <div className="summary-row">
                <span>Total Items</span>
                <strong>{totalItems}</strong>
              </div>

              <div className="summary-row">
                <span>Subtotal</span>

                <strong>
                  {totalPrice.toLocaleString()} IQD
                </strong>
              </div>

              <div className="summary-note">
                <span>✓</span>
                Handmade products from Iraqi artisans
              </div>

              <div className="summary-total">
                <div>
                  <span>Total</span>
                  <small>Including all selected items</small>
                </div>

                <strong>
                  {totalPrice.toLocaleString()} IQD
                </strong>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="checkout-button"
              >
                Proceed to Checkout
                <span>→</span>
              </button>

              <button
                onClick={() => navigate("/artisans")}
                className="continue-shopping-button"
              >
                Continue Shopping
              </button>

              <div className="summary-footer">
                <span>𒀭</span>
                Supporting Iraqi craftsmanship
              </div>

            </div>
          </aside>

        </div>
      </div>
    </main>
  );
};

export default Cart;