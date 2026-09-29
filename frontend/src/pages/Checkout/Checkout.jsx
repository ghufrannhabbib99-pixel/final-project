import { useState } from "react";
import { useNavigate } from "react-router-dom";
import productImages from "../../data/productImages";
import api from "../../services/api";
import "./Checkout.css";

function Checkout() {
  const navigate = useNavigate();

  const [cartItems] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("cart") || "[]");
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const total = cartItems.reduce(
    (sum, item) =>
      sum + Number(item.price || 0) * Number(item.quantity || 0),
    0
  );

  const totalItems = cartItems.reduce(
    (sum, item) => sum + Number(item.quantity || 0),
    0
  );

  const createOrder = async () => {
    if (!cartItems.length) {
      setError("Your cart is empty.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please login before placing your order.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const order = await api.orders.create({
        total_amount: total,
        status: "pending",
      });

      if (!order?.id) {
        throw new Error(
          "Order was created but no order ID was returned."
        );
      }

      for (const item of cartItems) {
        await api.orderItems.create({
          order_id: order.id,
          product_id: item.id,
          quantity: Number(item.quantity),
          price: Number(item.price),
        });
      }

      localStorage.removeItem("cart");

      alert("Order placed successfully!");

      navigate("/my-orders");
    } catch (err) {
      console.error("Failed to create order:", err);

      if (
        err.message?.toLowerCase().includes("401") ||
        err.message?.toLowerCase().includes("unauthorized")
      ) {
        setError("Your session has expired. Please login again.");
      } else {
        setError(
          err.message ||
            "Failed to place the order. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="checkout-page">

      {/* decorative background */}
      <div className="checkout-orb checkout-orb-one" />
      <div className="checkout-orb checkout-orb-two" />
      <div className="checkout-cuneiform">𒀭</div>

      <div className="checkout-container">

        {/* ================= HERO ================= */}

        <section className="checkout-hero">

          <div className="checkout-hero-top">
            <div>
              <span className="checkout-kicker">
                ALHERFA COLLECTION
              </span>

              <h1>
                Complete Your
                <span> Order</span>
              </h1>

              <p>
                Review your handcrafted products and place your
                order with confidence.
              </p>
            </div>

            <div className="checkout-hero-badge">
              <span>✦</span>
              <strong>HANDMADE</strong>
              <small>IRAQI CRAFT</small>
            </div>
          </div>

          {/* progress */}
          <div className="checkout-progress">

            <div className="progress-step active">
              <div className="progress-circle">
                01
              </div>

              <div>
                <strong>Review</strong>
                <small>Your selection</small>
              </div>
            </div>

            <div className="progress-line">
              <span />
            </div>

            <div className="progress-step">
              <div className="progress-circle">
                02
              </div>

              <div>
                <strong>Confirm</strong>
                <small>Place your order</small>
              </div>
            </div>

          </div>

        </section>

        {/* ================= ERROR ================= */}

        {error && (
          <div className="checkout-error">
            <div className="checkout-error-icon">!</div>

            <div>
              <strong>Something went wrong</strong>
              <p>{error}</p>
            </div>
          </div>
        )}

        {/* ================= EMPTY ================= */}

        {cartItems.length === 0 ? (
          <section className="checkout-empty">

            <div className="empty-cart-animation">
              🛒
            </div>

            <span>YOUR CART</span>

            <h2>Your cart is empty</h2>

            <p>
              Add some handmade products before checking out.
            </p>

            <button
              onClick={() => navigate("/products")}
              className="checkout-main-button"
            >
              Explore Products
              <span>→</span>
            </button>

          </section>
        ) : (

          <div className="checkout-main-layout">

            {/* ================= LEFT ================= */}

            <section className="checkout-selection">

              <div className="section-heading">

                <div>
                  <span>YOUR SELECTION</span>

                  <h2>
                    Selected Products
                  </h2>
                </div>

                <div className="items-pill">
                  {totalItems}{" "}
                  {totalItems === 1 ? "ITEM" : "ITEMS"}
                </div>

              </div>

              <div className="checkout-products-list">

                {cartItems.map((item, index) => {

                  const image =
                    item.image ||
                    productImages[item.name] ||
                    null;

                  const itemTotal =
                    Number(item.price || 0) *
                    Number(item.quantity || 0);

                  return (
                    <article
                      key={item.id}
                      className="checkout-item"
                      style={{
                        animationDelay: `${index * 120}ms`,
                      }}
                    >

                      <div className="item-index">
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      <div className="item-image">

                        {image ? (
                          <img
                            src={image}
                            alt={item.name}
                          />
                        ) : (
                          <div className="item-image-empty">
                            ✦
                          </div>
                        )}

                      </div>

                      <div className="item-information">

                        <span className="item-label">
                          HANDCRAFTED PRODUCT
                        </span>

                        <h3>{item.name}</h3>

                        {item.craft_name && (
                          <p className="item-craft">
                            {item.craft_name}
                          </p>
                        )}

                        <div className="item-details">

                          <span>
                            Quantity
                            <strong>
                              {item.quantity}
                            </strong>
                          </span>

                          <span>
                            Unit price
                            <strong>
                              {Number(
                                item.price
                              ).toLocaleString()}{" "}
                              IQD
                            </strong>
                          </span>

                        </div>

                      </div>

                      <div className="item-total">

                        <span>ITEM TOTAL</span>

                        <strong>
                          {itemTotal.toLocaleString()} IQD
                        </strong>

                      </div>

                    </article>
                  );
                })}

              </div>

              <button
                onClick={() => navigate("/cart")}
                className="back-cart-link"
                disabled={loading}
              >
                <span>←</span>
                Back to shopping cart
              </button>

            </section>

            {/* ================= RIGHT ================= */}

            <aside className="checkout-summary">

              <div className="summary-decoration">
                ✦
              </div>

              <div className="summary-heading">
                <span>ORDER DETAILS</span>

                <h2>
                  Order Summary
                </h2>
              </div>

              <div className="summary-line" />

              <div className="summary-information">

                <div className="summary-row">
                  <span>Products</span>
                  <strong>{totalItems}</strong>
                </div>

                <div className="summary-row">
                  <span>Subtotal</span>

                  <strong>
                    {total.toLocaleString()} IQD
                  </strong>
                </div>

              </div>

              <div className="summary-note">
                <div>✓</div>

                <p>
                  Every product in your order is
                  handcrafted by Iraqi artisans.
                </p>
              </div>

              <div className="summary-total">

                <div>
                  <span>TOTAL</span>
                  <small>Final order amount</small>
                </div>

                <strong>
                  {total.toLocaleString()} IQD
                </strong>

              </div>

              <button
                onClick={createOrder}
                disabled={loading}
                className="place-order-button"
              >
                {loading ? (
                  <>
                    <span className="spinner" />
                    Placing Order
                  </>
                ) : (
                  <>
                    Place Order
                    <span>→</span>
                  </>
                )}
              </button>

              <button
                onClick={() => navigate("/cart")}
                disabled={loading}
                className="summary-cart-button"
              >
                Return to Cart
              </button>

              <div className="summary-footer">
                <span>𒀭</span>
                Supporting Iraqi craftsmanship
              </div>

            </aside>

          </div>
        )}

      </div>
    </main>
  );
}

export default Checkout;