const db = require("../../config/db");

const getAllProducts = async (filters = {}) => {
  const { search, category_id, artisan_id } = filters;

  const conditions = [];
  const values = [];

  if (search) {
    values.push(`%${search}%`);

    conditions.push(`
      (
        p.name ILIKE $${values.length}
        OR p.description ILIKE $${values.length}
      )
    `);
  }

  if (category_id !== undefined) {
    values.push(category_id);
    conditions.push(`p.category_id = $${values.length}`);
  }

  if (artisan_id !== undefined) {
    values.push(artisan_id);
    conditions.push(`p.artisan_id = $${values.length}`);
  }

  const whereClause =
    conditions.length > 0
      ? `WHERE ${conditions.join(" AND ")}`
      : "";

  const result = await db.query(
    `SELECT
      p.*,
      a.user_id AS artisan_user_id,
      a.craft_name,
      c.name AS category_name
     FROM products p
     LEFT JOIN artisans a
       ON p.artisan_id = a.id
     LEFT JOIN categories c
       ON p.category_id = c.id
     ${whereClause}
     ORDER BY p.created_at DESC`,
    values
  );

  return result.rows;
};

const getProductById = async (id) => {
  const result = await db.query(
    `SELECT
      p.*,
      a.user_id AS artisan_user_id,
      a.craft_name,
      c.name AS category_name
     FROM products p
     LEFT JOIN artisans a
       ON p.artisan_id = a.id
     LEFT JOIN categories c
       ON p.category_id = c.id
     WHERE p.id = $1`,
    [id]
  );

  return result.rows[0];
};

const createProduct = async (productData) => {
  const {
    artisan_id,
    category_id,
    name,
    description,
    price,
    stock_quantity,
    image,
  } = productData;

  const result = await db.query(
    `INSERT INTO products
      (
        artisan_id,
        category_id,
        name,
        description,
        price,
        stock_quantity,
        image
      )
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [
      artisan_id,
      category_id,
      name,
      description,
      price,
      stock_quantity,
      image,
    ]
  );

  return result.rows[0];
};

const updateProduct = async (id, productData) => {
  const allowedFields = [
    "category_id",
    "name",
    "description",
    "price",
    "stock_quantity",
    "image",
  ];

  const fields = [];
  const values = [];

  for (const field of allowedFields) {
    if (productData[field] !== undefined) {
      fields.push(field);
      values.push(productData[field]);
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
    `UPDATE products
     SET ${setClause},
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $${values.length}
     RETURNING *`,
    values
  );

  return result.rows[0];
};

const deleteProduct = async (id) => {
  const result = await db.query(
    "DELETE FROM products WHERE id = $1 RETURNING *",
    [id]
  );

  return result.rows[0];
};

const getProductsByArtisanId = async (artisanId) => {
  const result = await db.query(
    `SELECT
      p.*,
      a.user_id AS artisan_user_id,
      a.craft_name,
      c.name AS category_name
     FROM products p
     LEFT JOIN artisans a
       ON p.artisan_id = a.id
     LEFT JOIN categories c
       ON p.category_id = c.id
     WHERE p.artisan_id = $1
     ORDER BY p.id DESC`,
    [artisanId]
  );

  return result.rows;
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByArtisanId,
};