const db = require("../../config/db");

const getDashboardStats = async () => {
  const result = await db.query(`
    SELECT
      (SELECT COUNT(*) FROM users) AS users_count,
      (SELECT COUNT(*) FROM artisans) AS artisans_count,
      (SELECT COUNT(*) FROM products) AS products_count,
      (SELECT COUNT(*) FROM categories) AS categories_count,
      (SELECT COUNT(*) FROM orders) AS orders_count,
      (SELECT COUNT(*) FROM reviews) AS reviews_count,
      (SELECT COUNT(*) FROM favorites) AS favorites_count
  `);

  const stats = result.rows[0];

  return {
    users_count: Number(stats.users_count),
    artisans_count: Number(stats.artisans_count),
    products_count: Number(stats.products_count),
    categories_count: Number(stats.categories_count),
    orders_count: Number(stats.orders_count),
    reviews_count: Number(stats.reviews_count),
    favorites_count: Number(stats.favorites_count),
  };
};

module.exports = {
  getDashboardStats,
};