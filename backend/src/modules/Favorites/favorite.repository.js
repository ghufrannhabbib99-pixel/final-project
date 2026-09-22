const db = require("../../config/db");

const getFavoritesByUserId = async (userId) => {
  const result = await db.query(
    `SELECT
      f.id,
      f.user_id,
      f.product_id,
      f.created_at,
      p.name,
      p.description,
      p.price,
      p.stock_quantity,
      p.image,
      p.artisan_id,
      p.category_id
     FROM favorites f
     INNER JOIN products p
       ON f.product_id = p.id
     WHERE f.user_id = $1
     ORDER BY f.created_at DESC`,
    [userId]
  );

  return result.rows;
};

const getFavoriteByUserAndProduct = async (
  userId,
  productId
) => {
  const result = await db.query(
    `SELECT *
     FROM favorites
     WHERE user_id = $1
       AND product_id = $2`,
    [userId, productId]
  );

  return result.rows[0];
};

const createFavorite = async (userId, productId) => {
  const result = await db.query(
    `INSERT INTO favorites
      (user_id, product_id)
     VALUES ($1, $2)
     RETURNING *`,
    [userId, productId]
  );

  return result.rows[0];
};

const deleteFavorite = async (userId, productId) => {
  const result = await db.query(
    `DELETE FROM favorites
     WHERE user_id = $1
       AND product_id = $2
     RETURNING *`,
    [userId, productId]
  );

  return result.rows[0];
};

module.exports = {
  getFavoritesByUserId,
  getFavoriteByUserAndProduct,
  createFavorite,
  deleteFavorite,
};