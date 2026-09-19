const db = require("../../config/db");

const getAllProducts = async () => {
  const result = await db.query(
    "SELECT * FROM products ORDER BY created_at DESC"
  );

  return result.rows;
};

const getProductById = async (id) => {
  const result = await db.query(
    "SELECT * FROM products WHERE id = $1",
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

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};