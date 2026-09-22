const db = require("../../config/db");

const getAllReviews = async () => {
  const result = await db.query(
    `SELECT
      reviews.id,
      reviews.user_id,
      users.name AS user_name,
      reviews.product_id,
      reviews.rating,
      reviews.comment,
      reviews.created_at,
      reviews.updated_at
     FROM reviews
     INNER JOIN users
       ON reviews.user_id = users.id
     ORDER BY reviews.created_at DESC`
  );

  return result.rows;
};

const getReviewById = async (id) => {
  const result = await db.query(
    `SELECT
      reviews.id,
      reviews.user_id,
      users.name AS user_name,
      reviews.product_id,
      reviews.rating,
      reviews.comment,
      reviews.created_at,
      reviews.updated_at
     FROM reviews
     INNER JOIN users
       ON reviews.user_id = users.id
     WHERE reviews.id = $1`,
    [id]
  );

  return result.rows[0];
};

const getReviewsByProduct = async (productId) => {
  const result = await db.query(
    `SELECT
      reviews.id,
      reviews.user_id,
      users.name AS user_name,
      reviews.product_id,
      reviews.rating,
      reviews.comment,
      reviews.created_at,
      reviews.updated_at
     FROM reviews
     INNER JOIN users
       ON reviews.user_id = users.id
     WHERE reviews.product_id = $1
     ORDER BY reviews.created_at DESC`,
    [productId]
  );

  return result.rows;
};

const getProductRatingSummary = async (productId) => {
  const result = await db.query(
    `SELECT
      COALESCE(ROUND(AVG(rating), 1), 0) AS average_rating,
      COUNT(*) AS review_count
     FROM reviews
     WHERE product_id = $1`,
    [productId]
  );

  return result.rows[0];
};

const createReview = async (reviewData) => {
  const {
    user_id,
    product_id,
    rating,
    comment,
  } = reviewData;

  const purchaseResult = await db.query(
    `SELECT 1
     FROM orders
     INNER JOIN order_items
       ON orders.id = order_items.order_id
     WHERE orders.user_id = $1
       AND order_items.product_id = $2
     LIMIT 1`,
    [user_id, product_id]
  );

  if (purchaseResult.rows.length === 0) {
    const error = new Error("User has not purchased this product");
    error.code = "PRODUCT_NOT_PURCHASED";
    throw error;
  }

  const result = await db.query(
    `INSERT INTO reviews
      (
        user_id,
        product_id,
        rating,
        comment
      )
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [
      user_id,
      product_id,
      rating,
      comment,
    ]
  );

  return result.rows[0];
};

const updateReview = async (id, reviewData) => {
  const allowedFields = [
    "rating",
    "comment",
  ];

  const fields = [];
  const values = [];

  for (const field of allowedFields) {
    if (reviewData[field] !== undefined) {
      fields.push(field);
      values.push(reviewData[field]);
    }
  }

  if (fields.length === 0) {
    return null;
  }

  const setClause = fields
    .map((field, index) => `${field} = $${index + 1}`)
    .join(", ");

  values.push(id);

  const result = await db.query(
    `UPDATE reviews
     SET ${setClause},
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $${values.length}
     RETURNING *`,
    values
  );

  return result.rows[0];
};

const deleteReview = async (id) => {
  const result = await db.query(
    `DELETE FROM reviews
     WHERE id = $1
     RETURNING *`,
    [id]
  );

  return result.rows[0];
};

module.exports = {
  getAllReviews,
  getReviewById,
  getReviewsByProduct,
  getProductRatingSummary,
  createReview,
  updateReview,
  deleteReview,
};