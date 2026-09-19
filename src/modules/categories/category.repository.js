const db = require("../../config/db");

const getAllCategories = async () => {
  const result = await db.query(
    "SELECT * FROM categories ORDER BY created_at DESC"
  );

  return result.rows;
};

const getCategoryById = async (id) => {
  const result = await db.query(
    "SELECT * FROM categories WHERE id = $1",
    [id]
  );

  return result.rows[0];
};

const createCategory = async (categoryData) => {
  const { name, description } = categoryData;

  const result = await db.query(
    `INSERT INTO categories
      (name, description)
     VALUES ($1, $2)
     RETURNING *`,
    [name, description]
  );

  return result.rows[0];
};

const updateCategory = async (id, categoryData) => {
  const allowedFields = ["name", "description"];

  const fields = [];
  const values = [];

  for (const field of allowedFields) {
    if (categoryData[field] !== undefined) {
      fields.push(field);
      values.push(categoryData[field]);
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
    `UPDATE categories
     SET ${setClause},
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $${values.length}
     RETURNING *`,
    values
  );

  return result.rows[0];
};

const deleteCategory = async (id) => {
  const result = await db.query(
    "DELETE FROM categories WHERE id = $1 RETURNING *",
    [id]
  );

  return result.rows[0];
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
}; 