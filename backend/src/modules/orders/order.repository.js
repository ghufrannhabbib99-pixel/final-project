const db = require("../../config/db");

const getAllOrders = async () => {
  const result = await db.query(
    "SELECT * FROM orders ORDER BY created_at DESC"
  );

  return result.rows;
};

const getOrderById = async (id) => {
  const result = await db.query(
    "SELECT * FROM orders WHERE id = $1",
    [id]
  );

  return result.rows[0];
};

const createOrder = async (orderData) => {
  const {
    user_id,
    total_amount,
    status,
  } = orderData;

  const result = await db.query(
    `INSERT INTO orders
      (
        user_id,
        total_amount,
        status
      )
     VALUES ($1, $2, $3)
     RETURNING *`,
    [
      user_id,
      total_amount,
      status,
    ]
  );

  return result.rows[0];
};

const updateOrder = async (id, orderData) => {
  const allowedFields = [
    "status",
  ];

  const fields = [];
  const values = [];

  for (const field of allowedFields) {
    if (orderData[field] !== undefined) {
      fields.push(field);
      values.push(orderData[field]);
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
    `UPDATE orders
     SET ${setClause},
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $${values.length}
     RETURNING *`,
    values
  );

  return result.rows[0];
};

const deleteOrder = async (id) => {
  const result = await db.query(
    "DELETE FROM orders WHERE id = $1 RETURNING *",
    [id]
  );

  return result.rows[0];
};
const getOrdersByUserId = async (userId) => {
  const result = await db.query(
    `SELECT *
     FROM orders
     WHERE user_id = $1
     ORDER BY created_at DESC`,
    [userId]
  );

  return result.rows;
};
module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrdersByUserId,
};