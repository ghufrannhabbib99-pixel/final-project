import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

  // Empty Cart
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#FDF0D5] px-6 py-10">
        <div className="mx-auto max-w-5xl">

          <button
            onClick={() => navigate("/artisans")}
            className="mb-8 rounded-2xl bg-white px-5 py-3 font-bold text-[#003049] shadow-md transition hover:-translate-y-1"
          >
            ← Back to Artisans
          </button>

          <div className="rounded-3xl bg-white p-12 text-center shadow-xl">

            <div className="text-7xl">
              🛒
            </div>

            <h1 className="mt-6 text-3xl font-black text-[#003049]">
              Your Cart is Empty
            </h1>

            <p className="mt-3 text-gray-500">
              You haven't added any products to your cart yet.
            </p>

            <button
              onClick={() => navigate("/artisans")}
              className="mt-7 rounded-2xl bg-[#780000] px-7 py-3 font-bold text-white transition hover:-translate-y-1 hover:bg-[#C1121F]"
            >
              Explore Artisans
            </button>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDF0D5] px-4 py-8 md:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h1 className="text-4xl font-black text-[#003049]">
              Shopping Cart 🛒
            </h1>

            <p className="mt-2 text-gray-600">
              You have {totalItems}{" "}
              {totalItems === 1 ? "item" : "items"} in your cart
            </p>
          </div>

          <button
            onClick={clearCart}
            className="rounded-2xl border-2 border-[#780000] bg-white px-5 py-3 font-bold text-[#780000] transition hover:bg-[#780000] hover:text-white"
          >
            Clear Cart
          </button>

        </div>

        <div className="grid gap-8 lg:grid-cols-3">

          {/* Products */}
          <div className="space-y-5 lg:col-span-2">

            {cart.map((item) => (
              <div
                key={item.id}
                className="overflow-hidden rounded-3xl bg-white shadow-lg"
              >

                <div className="flex flex-col sm:flex-row">

                  {/* Image */}
                  <div className="flex h-52 w-full items-center justify-center bg-[#FDF0D5] sm:h-auto sm:w-52">

                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="text-6xl">
                        🛍️
                      </div>
                    )}

                  </div>

                  {/* Info */}
                  <div className="flex flex-1 flex-col justify-between p-6">

                    <div>
                      <div className="flex items-start justify-between gap-4">

                        <div>
                          <h2 className="text-xl font-bold text-[#003049]">
                            {item.name}
                          </h2>

                          {item.craft_name && (
                            <p className="mt-1 text-sm font-semibold text-[#780000]">
                              {item.craft_name}
                            </p>
                          )}
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-2xl text-gray-400 transition hover:text-[#780000]"
                          title="Remove product"
                        >
                          ×
                        </button>

                      </div>

                      <p className="mt-3 leading-7 text-gray-500">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                      {/* Quantity */}
                      <div>
                        <p className="mb-2 text-sm font-semibold text-gray-500">
                          Quantity
                        </p>

                        <div className="flex items-center gap-3">

                          <button
                            onClick={() =>
                              decreaseQuantity(item.id)
                            }
                            className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FDF0D5] text-xl font-bold text-[#003049] transition hover:bg-[#669BBC] hover:text-white"
                          >
                            −
                          </button>

                          <span className="w-8 text-center text-lg font-black text-[#003049]">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              increaseQuantity(item.id)
                            }
                            disabled={
                              item.quantity >=
                              item.stock_quantity
                            }
                            className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FDF0D5] text-xl font-bold text-[#003049] transition hover:bg-[#669BBC] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            +
                          </button>

                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-left">

                        <p className="text-sm text-gray-500">
                          Price
                        </p>

                        <p className="text-2xl font-black text-[#780000]">
                          {(
                            Number(item.price) *
                            item.quantity
                          ).toLocaleString()}{" "}
                          IQD
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          {Number(
                            item.price
                          ).toLocaleString()}{" "}
                          IQD each
                        </p>

                      </div>

                    </div>

                  </div>
                </div>
              </div>
            ))}

          </div>

          {/* Order Summary */}
          <div>
            <div className="sticky top-6 rounded-3xl bg-white p-7 shadow-xl">

              <h2 className="text-2xl font-black text-[#003049]">
                Order Summary
              </h2>

              <div className="mt-6 space-y-4">

                <div className="flex justify-between text-gray-600">
                  <span>Total Items</span>
                  <span className="font-bold">
                    {totalItems}
                  </span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-bold">
                    {totalPrice.toLocaleString()} IQD
                  </span>
                </div>

                <div className="border-t pt-4">

                  <div className="flex items-center justify-between">

                    <span className="text-lg font-bold text-[#003049]">
                      Total
                    </span>

                    <span className="text-2xl font-black text-[#780000]">
                      {totalPrice.toLocaleString()} IQD
                    </span>

                  </div>

                </div>

              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="mt-7 w-full rounded-2xl bg-[#780000] px-6 py-4 font-bold text-white transition hover:-translate-y-1 hover:bg-[#C1121F]"
              >
                Proceed to Checkout →
              </button>

              <button
                onClick={() => navigate("/artisans")}
                className="mt-3 w-full rounded-2xl bg-[#FDF0D5] px-6 py-4 font-bold text-[#003049] transition hover:bg-[#669BBC] hover:text-white"
              >
                Continue Shopping
              </button>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;