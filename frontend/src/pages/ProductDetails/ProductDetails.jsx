import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

const productImages = {
  // Copper
  19: "/images/products/copper/copper-tray.jpg",
  20: "/images/products/copper/iraqi-copper-dallah.jpg",
  21: "/images/products/copper/copper-lantern.jpg",

  // Ceramics
  2: "/images/products/ceramics/cup.jpg",
  3: "/images/products/ceramics/vase.jpg",
  4: "/images/products/ceramics/vase.jpg",
  5: "/images/products/ceramics/cup.jpg",
  6: "/images/products/ceramics/plate.jpg",

  // Wood
  7: "/images/products/wood/wooden-box.jpg",
  8: "/images/products/wood/wooden-shelf.jpg",
  9: "/images/products/wood/small-table.jpg",

  // Sewing / Embroidery
  10: "/images/products/sewing/embroidered-cloth.jpg",
  11: "/images/products/sewing/embroidered-bag.jpg",
  12: "/images/products/sewing/traditional-shawl.jpg",
  16: "/images/products/sewing/iraqi-embroidery.jpg",
  17: "/images/products/sewing/handmade-embroidered-bag.jpg",
  18: "/images/products/sewing/embroidered-pillow.jpg",

  // Palm
  13: "/images/products/palm/palm-basket.jpg",
  14: "/images/products/palm/palm-mat.jpg",
  15: "/images/products/palm/palm-storage-basket.jpg",
};

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [added, setAdded] = useState(false);

  // =========================
  // Reviews
  // =========================

  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);

  const [selectedRating, setSelectedRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");

  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewError, setReviewError] = useState("");
  const [reviewSuccess, setReviewSuccess] = useState("");

  // Edit review
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editRating, setEditRating] = useState(0);
  const [editComment, setEditComment] = useState("");
  const [reviewActionLoading, setReviewActionLoading] =
    useState(false);

  // =========================
  // Load product + reviews
  // =========================

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.products.getById(id);

        console.log("PRODUCT DETAILS:", response);

        setProduct(response);

        try {
          const [
            reviewsResponse,
            summaryResponse,
          ] = await Promise.all([
            api.reviews.getByProduct(id),
            api.reviews.getProductSummary(id),
          ]);

          setReviews(
            Array.isArray(reviewsResponse)
              ? reviewsResponse
              : []
          );

          setAverageRating(
            Number(
              summaryResponse?.average_rating || 0
            )
          );

          setReviewCount(
            Number(
              summaryResponse?.review_count || 0
            )
          );
        } catch (reviewErr) {
          console.error(
            "Failed to load reviews:",
            reviewErr
          );
        }
      } catch (err) {
        console.error(
          "Failed to load product:",
          err
        );

        setError(
          err.message ||
            "Failed to load product"
        );
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  // =========================
  // Add to Cart
  // =========================

  const addToCart = () => {
    if (!product) return;

    const stock = Number(
      product.stock_quantity || 0
    );

    if (stock <= 0) {
      alert("This product is out of stock.");
      return;
    }

    try {
      const existingCart = JSON.parse(
        localStorage.getItem("cart") || "[]"
      );

      const existingItem = existingCart.find(
        (item) =>
          Number(item.id) === Number(product.id)
      );

      let updatedCart;

      if (existingItem) {
        if (existingItem.quantity >= stock) {
          alert(
            "Maximum available stock reached."
          );
          return;
        }

        updatedCart = existingCart.map(
          (item) =>
            Number(item.id) ===
            Number(product.id)
              ? {
                  ...item,
                  quantity:
                    item.quantity + 1,
                }
              : item
        );
      } else {
        updatedCart = [
          ...existingCart,
          {
            id: product.id,
            name: product.name,
            description:
              product.description || "",
            price: Number(
              product.price || 0
            ),
            stock_quantity: stock,
            image:
              productImages[product.id] ||
              product.image?.trim() ||
              "",
            craft_name:
              product.craft_name || "",
            category_name:
              product.category_name ||
              product.category ||
              "Handmade",
            quantity: 1,
          },
        ];
      }

      localStorage.setItem(
        "cart",
        JSON.stringify(updatedCart)
      );

      setAdded(true);

      setTimeout(() => {
        setAdded(false);
      }, 2000);

      console.log(
        "CART UPDATED:",
        updatedCart
      );
    } catch (err) {
      console.error(
        "Failed to add product to cart:",
        err
      );

      alert(
        "Failed to add product to cart."
      );
    }
  };

  // =========================
  // Submit new review
  // =========================

  const submitReview = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");

    setReviewError("");
    setReviewSuccess("");

    if (!token) {
      setReviewError(
        "Please login to write a review."
      );
      return;
    }

    if (!selectedRating) {
      setReviewError(
        "Please select a rating from 1 to 5 stars."
      );
      return;
    }

    try {
      setReviewLoading(true);

      await api.reviews.create({
        product_id: Number(id),
        rating: Number(selectedRating),
        comment: reviewComment.trim(),
      });

      const [
        reviewsResponse,
        summaryResponse,
      ] = await Promise.all([
        api.reviews.getByProduct(id),
        api.reviews.getProductSummary(id),
      ]);

      setReviews(
        Array.isArray(reviewsResponse)
          ? reviewsResponse
          : []
      );

      setAverageRating(
        Number(
          summaryResponse?.average_rating || 0
        )
      );

      setReviewCount(
        Number(
          summaryResponse?.review_count || 0
        )
      );

      setSelectedRating(0);
      setReviewComment("");

      setReviewSuccess(
        "Your review has been added successfully."
      );
    } catch (err) {
      console.error(
        "Failed to create review:",
        err
      );

      const message =
        err.message || "";

      if (
        message.includes(
          "User has not purchased this product"
        )
      ) {
        setReviewError(
          "You can review this product only after purchasing it."
        );
      } else {
        setReviewError(
          message ||
            "Failed to submit your review."
        );
      }
    } finally {
      setReviewLoading(false);
    }
  };

  // =========================
  // Current user
  // =========================

  const getCurrentUser = () => {
    try {
      return JSON.parse(
        localStorage.getItem("user") || "null"
      );
    } catch {
      return null;
    }
  };

  // =========================
  // Start editing review
  // =========================

  const startEditingReview = (review) => {
    setEditingReviewId(review.id);
    setEditRating(
      Number(review.rating || 0)
    );
    setEditComment(review.comment || "");

    setReviewError("");
    setReviewSuccess("");
  };

  // =========================
  // Cancel editing
  // =========================

  const cancelEditingReview = () => {
    setEditingReviewId(null);
    setEditRating(0);
    setEditComment("");
  };

  // =========================
  // Update review
  // =========================

  const updateReview = async (reviewId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setReviewError(
        "Please login to edit your review."
      );
      return;
    }

    if (!editRating) {
      setReviewError(
        "Please select a rating from 1 to 5 stars."
      );
      return;
    }

    try {
      setReviewActionLoading(true);
      setReviewError("");
      setReviewSuccess("");

      await api.reviews.update(reviewId, {
        rating: Number(editRating),
        comment: editComment.trim(),
      });

      const [
        reviewsResponse,
        summaryResponse,
      ] = await Promise.all([
        api.reviews.getByProduct(id),
        api.reviews.getProductSummary(id),
      ]);

      setReviews(
        Array.isArray(reviewsResponse)
          ? reviewsResponse
          : []
      );

      setAverageRating(
        Number(
          summaryResponse?.average_rating || 0
        )
      );

      setReviewCount(
        Number(
          summaryResponse?.review_count || 0
        )
      );

      cancelEditingReview();

      setReviewSuccess(
        "Your review has been updated successfully."
      );
    } catch (err) {
      console.error(
        "Failed to update review:",
        err
      );

      setReviewError(
        err.message ||
          "Failed to update your review."
      );
    } finally {
      setReviewActionLoading(false);
    }
  };

  // =========================
  // Delete review
  // =========================

  const deleteReview = async (reviewId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this review?"
    );

    if (!confirmed) return;

    const token = localStorage.getItem("token");

    if (!token) {
      setReviewError(
        "Please login to delete your review."
      );
      return;
    }

    try {
      setReviewActionLoading(true);
      setReviewError("");
      setReviewSuccess("");

      await api.reviews.remove(reviewId);

      const [
        reviewsResponse,
        summaryResponse,
      ] = await Promise.all([
        api.reviews.getByProduct(id),
        api.reviews.getProductSummary(id),
      ]);

      setReviews(
        Array.isArray(reviewsResponse)
          ? reviewsResponse
          : []
      );

      setAverageRating(
        Number(
          summaryResponse?.average_rating || 0
        )
      );

      setReviewCount(
        Number(
          summaryResponse?.review_count || 0
        )
      );

      if (editingReviewId === reviewId) {
        cancelEditingReview();
      }

      setReviewSuccess(
        "Your review has been deleted successfully."
      );
    } catch (err) {
      console.error(
        "Failed to delete review:",
        err
      );

      setReviewError(
        err.message ||
          "Failed to delete your review."
      );
    } finally {
      setReviewActionLoading(false);
    }
  };

  // =========================
  // Loading
  // =========================

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FDF0D5] px-6 py-16">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-lg font-medium text-[#003049]">
            Loading product...
          </p>
        </div>
      </main>
    );
  }

  // =========================
  // Error
  // =========================

  if (error || !product) {
    return (
      <main className="min-h-screen bg-[#FDF0D5] px-6 py-16">
        <div className="mx-auto max-w-2xl rounded-[2rem] bg-white px-6 py-16 text-center shadow-sm">

          <div className="text-4xl text-[#780000]">
            ⚠️
          </div>

          <h1 className="mt-5 text-2xl font-bold text-[#003049]">
            Product not found
          </h1>

          <p className="mt-3 text-sm text-[#003049]/60">
            {error ||
              "This product could not be found."}
          </p>

          <Link
            to="/products"
            className="mt-7 inline-block rounded-full bg-[#003049] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#780000]"
          >
            Back to Products
          </Link>

        </div>
      </main>
    );
  }

  // =========================
  // Product values
  // =========================

  const imageSrc =
    productImages[product.id] ||
    product.image?.trim() ||
    null;

  const categoryName =
    product.category_name ||
    product.category ||
    "Handmade";

  const formattedPrice = Number(
    product.price || 0
  ).toLocaleString("en-US");

  const stock = Number(
    product.stock_quantity || 0
  );

  const roundedAverage = Math.round(
    averageRating
  );

  const currentUser = getCurrentUser();

  // =========================
  // UI
  // =========================

  return (
    <main className="min-h-screen bg-[#FDF0D5] px-5 py-10 md:px-8 md:py-16">

      <div className="mx-auto max-w-6xl">

        {/* Back */}
        <Link
          to="/products"
          className="text-sm font-medium text-[#003049]/60 transition hover:text-[#780000]"
        >
          ← Back to Products
        </Link>

        {/* =========================
            Product Details
        ========================== */}

        <section className="mt-8 overflow-hidden rounded-[2rem] bg-white shadow-sm">

          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* Product Image */}

            <div className="bg-[#FDF0D5]">

              <div className="aspect-square overflow-hidden">

                {imageSrc ? (
                  <img
                    src={imageSrc}
                    alt={
                      product.name ||
                      "Handmade product"
                    }
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center text-[#780000]">

                    <span className="text-7xl">
                      𒀭
                    </span>

                    <span className="mt-4 text-sm font-medium text-[#003049]/60">
                      Handmade Product
                    </span>

                  </div>
                )}

              </div>

            </div>

            {/* Product Information */}

            <div className="flex flex-col justify-center p-7 md:p-12">

              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#780000]">
                {categoryName}
              </p>

              <h1 className="mt-4 text-3xl font-bold leading-tight text-[#003049] md:text-5xl">
                {product.name}
              </h1>

              {/* Rating Summary */}

              <div className="mt-5 flex items-center gap-3">

                <div className="text-xl text-[#780000]">

                  {"★".repeat(
                    roundedAverage
                  )}

                  {"☆".repeat(
                    5 - roundedAverage
                  )}

                </div>

                <span className="text-sm font-medium text-[#003049]/60">
                  {averageRating.toFixed(1)}
                  {" "}
                  ({reviewCount}{" "}
                  {reviewCount === 1
                    ? "review"
                    : "reviews"})
                </span>

              </div>

              {/* Price */}

              <p className="mt-7 text-3xl font-bold text-[#003049]">
                {formattedPrice} IQD
              </p>

              {/* Description */}

              <div className="mt-8">

                <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-[#003049]/50">
                  About this product
                </h2>

                <p className="mt-3 text-base leading-7 text-[#003049]/70">
                  {product.description ||
                    "No description available."}
                </p>

              </div>

              {/* Stock */}

              <div className="mt-7">

                {stock > 0 ? (
                  <p className="text-sm font-medium text-green-700">
                    ✓ {stock} items available
                  </p>
                ) : (
                  <p className="text-sm font-medium text-[#780000]">
                    Out of stock
                  </p>
                )}

              </div>

              {/* Artisan */}

              {product.craft_name && (
                <div className="mt-7 rounded-2xl border border-[#003049]/10 bg-[#FDF0D5]/50 p-5">

                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#780000]">
                    Crafted by
                  </p>

                  <p className="mt-2 font-semibold text-[#003049]">
                    {product.craft_name}
                  </p>

                </div>
              )}

              {/* Buttons */}

              <div className="mt-8 flex flex-wrap gap-3">

                <button
                  type="button"
                  onClick={addToCart}
                  disabled={stock === 0}
                  className="rounded-full bg-[#780000] px-7 py-3 font-medium text-white transition hover:bg-[#003049] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {added
                    ? "✓ Added to Cart"
                    : "Add to Cart"}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    navigate("/cart")
                  }
                  className="rounded-full border border-[#003049]/20 px-7 py-3 font-medium text-[#003049] transition hover:border-[#780000] hover:text-[#780000]"
                >
                  View Cart
                </button>

                <Link
                  to="/products"
                  className="rounded-full border border-[#003049]/20 px-7 py-3 font-medium text-[#003049] transition hover:border-[#780000] hover:text-[#780000]"
                >
                  Continue Shopping
                </Link>

              </div>

            </div>

          </div>

        </section>

        {/* =========================
            Reviews Section
        ========================== */}

        <section className="mt-12 border-t border-[#003049]/10 pt-10">

          {/* Reviews Header */}

          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">

            <div>

              <p className="text-sm font-bold uppercase tracking-wider text-[#780000]">
                Customer Reviews
              </p>

              <h2 className="mt-2 text-3xl font-black text-[#003049]">
                Reviews & Ratings
              </h2>

            </div>

            {/* Rating Summary Card */}

            <div className="rounded-2xl bg-white px-6 py-4 shadow-sm">

              <div className="flex items-center gap-3">

                <span className="text-3xl font-black text-[#003049]">
                  {averageRating.toFixed(1)}
                </span>

                <div>

                  <div className="text-lg text-[#780000]">

                    {"★".repeat(
                      roundedAverage
                    )}

                    {"☆".repeat(
                      5 - roundedAverage
                    )}

                  </div>

                  <p className="text-sm text-gray-500">
                    {reviewCount}{" "}
                    {reviewCount === 1
                      ? "review"
                      : "reviews"}
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* =========================
              Leave Review
          ========================== */}

          <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm">

            <h3 className="text-xl font-black text-[#003049]">
              Leave a Review
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Share your experience with this handmade product.
            </p>

            <form
              onSubmit={submitReview}
              className="mt-6"
            >

              {/* Rating */}

              <div>

                <p className="mb-2 text-sm font-bold text-[#003049]">
                  Your Rating
                </p>

                <div className="flex gap-2">

                  {[1, 2, 3, 4, 5].map(
                    (star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() =>
                          setSelectedRating(
                            star
                          )
                        }
                        className={`text-3xl transition hover:scale-110 ${
                          star <=
                          selectedRating
                            ? "text-[#780000]"
                            : "text-gray-300"
                        }`}
                        aria-label={`Rate ${star} stars`}
                      >
                        ★
                      </button>
                    )
                  )}

                </div>

              </div>

              {/* Comment */}

              <div className="mt-5">

                <label
                  htmlFor="review-comment"
                  className="mb-2 block text-sm font-bold text-[#003049]"
                >
                  Your Comment
                </label>

                <textarea
                  id="review-comment"
                  value={reviewComment}
                  onChange={(event) =>
                    setReviewComment(
                      event.target.value
                    )
                  }
                  rows={4}
                  placeholder="Tell other customers about your experience..."
                  className="w-full rounded-2xl border border-gray-200 bg-[#FDF0D5]/40 px-4 py-3 text-[#003049] outline-none transition focus:border-[#780000] focus:ring-2 focus:ring-[#780000]/10"
                />

              </div>

              {/* Review Error */}

              {reviewError && (
                <div className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                  {reviewError}
                </div>
              )}

              {/* Review Success */}

              {reviewSuccess && (
                <div className="mt-4 rounded-xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
                  {reviewSuccess}
                </div>
              )}

              {/* Submit */}

              <button
                type="submit"
                disabled={reviewLoading}
                className="mt-5 rounded-xl bg-[#003049] px-6 py-3 font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#780000] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {reviewLoading
                  ? "Submitting..."
                  : "Submit Review"}
              </button>

            </form>

          </div>

          {/* =========================
              Reviews List
          ========================== */}

          <div className="mt-8 space-y-5">

            {reviews.length === 0 ? (
              <div className="rounded-3xl bg-white p-8 text-center shadow-sm">

                <div className="text-5xl text-gray-300">
                  ★
                </div>

                <h3 className="mt-4 text-xl font-black text-[#003049]">
                  No reviews yet
                </h3>

                <p className="mt-2 text-gray-500">
                  Be the first customer to review this product.
                </p>

              </div>
            ) : (
              reviews.map((review) => {

                const rating = Math.min(
                  5,
                  Math.max(
                    1,
                    Number(review.rating || 0)
                  )
                );

                const isOwner =
                  currentUser &&
                  Number(review.user_id) ===
                    Number(currentUser.id);

                const isEditing =
                  editingReviewId ===
                  review.id;

                return (
                  <article
                    key={review.id}
                    className="rounded-3xl bg-white p-6 shadow-sm"
                  >

                    {/* =========================
                        Edit Mode
                    ========================== */}

                    {isEditing ? (
                      <div>

                        <div className="flex items-center justify-between">

                          <h3 className="font-bold text-[#003049]">
                            Edit Your Review
                          </h3>

                          <button
                            type="button"
                            onClick={
                              cancelEditingReview
                            }
                            className="text-sm font-medium text-gray-500 transition hover:text-[#780000]"
                          >
                            Cancel
                          </button>

                        </div>

                        {/* Edit Rating */}

                        <div className="mt-5">

                          <p className="mb-2 text-sm font-bold text-[#003049]">
                            Rating
                          </p>

                          <div className="flex gap-2">

                            {[1, 2, 3, 4, 5].map(
                              (star) => (
                                <button
                                  key={star}
                                  type="button"
                                  onClick={() =>
                                    setEditRating(
                                      star
                                    )
                                  }
                                  className={`text-3xl transition hover:scale-110 ${
                                    star <=
                                    editRating
                                      ? "text-[#780000]"
                                      : "text-gray-300"
                                  }`}
                                  aria-label={`Rate ${star} stars`}
                                >
                                  ★
                                </button>
                              )
                            )}

                          </div>

                        </div>

                        {/* Edit Comment */}

                        <div className="mt-5">

                          <label
                            htmlFor={`edit-review-${review.id}`}
                            className="mb-2 block text-sm font-bold text-[#003049]"
                          >
                            Comment
                          </label>

                          <textarea
                            id={`edit-review-${review.id}`}
                            value={editComment}
                            onChange={(
                              event
                            ) =>
                              setEditComment(
                                event.target
                                  .value
                              )
                            }
                            rows={4}
                            className="w-full rounded-2xl border border-gray-200 bg-[#FDF0D5]/40 px-4 py-3 text-[#003049] outline-none transition focus:border-[#780000] focus:ring-2 focus:ring-[#780000]/10"
                          />

                        </div>

                        {/* Save */}

                        <button
                          type="button"
                          onClick={() =>
                            updateReview(
                              review.id
                            )
                          }
                          disabled={
                            reviewActionLoading
                          }
                          className="mt-5 rounded-xl bg-[#003049] px-6 py-3 font-bold text-white transition hover:bg-[#780000] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {reviewActionLoading
                            ? "Saving..."
                            : "Save Changes"}
                        </button>

                      </div>
                    ) : (
                      /* =========================
                          Normal Review
                      ========================== */

                      <>
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

                          <div>

                            <h3 className="font-bold text-[#003049]">
                              {review.user_name ||
                                "Customer"}
                            </h3>

                            <div className="mt-1 text-[#780000]">

                              {"★".repeat(
                                rating
                              )}

                              {"☆".repeat(
                                5 - rating
                              )}

                            </div>

                          </div>

                          <div className="flex flex-col items-start gap-2 sm:items-end">

                            <p className="text-sm text-gray-400">
                              {review.created_at
                                ? new Date(
                                    review.created_at
                                  ).toLocaleDateString()
                                : ""}
                            </p>

                            {/* Edit/Delete only for owner */}

                            {isOwner && (
                              <div className="flex gap-2">

                                <button
                                  type="button"
                                  onClick={() =>
                                    startEditingReview(
                                      review
                                    )
                                  }
                                  className="rounded-lg border border-[#003049]/15 px-3 py-1.5 text-xs font-bold text-[#003049] transition hover:border-[#780000] hover:text-[#780000]"
                                >
                                  Edit
                                </button>

                                <button
                                  type="button"
                                  onClick={() =>
                                    deleteReview(
                                      review.id
                                    )
                                  }
                                  disabled={
                                    reviewActionLoading
                                  }
                                  className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-bold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                  Delete
                                </button>

                              </div>
                            )}

                          </div>

                        </div>

                        {/* Comment */}

                        {review.comment && (
                          <p className="mt-4 leading-7 text-gray-600">
                            {review.comment}
                          </p>
                        )}

                      </>
                    )}

                  </article>
                );
              })
            )}

          </div>

        </section>

      </div>

    </main>
  );
}

export default ProductDetails;