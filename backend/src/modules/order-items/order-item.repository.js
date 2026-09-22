const db = require("../../config/db");

const getAllOrderItems = async () => {
  const result = await db.query(
    `SELECT
      oi.*,
      o.user_id
     FROM order_items oi
     JOIN orders o
       ON oi.order_id = o.id
     ORDER BY oi.id DESC`
  );

  return result.rows;
};

const getOrderItemById = async (id) => {
  const result = await db.query(
    `SELECT
      oi.*,
      o.user_id
     FROM order_items oi
     JOIN orders o
       ON oi.order_id = o.id
     WHERE oi.id = $1`,
    [id]
  );

  return result.rows[0];
};

const createOrderItem = async (itemData) => {
  const {
    order_id,
    product_id,
    quantity,
    price,
  } = itemData;

  const result = await db.query(
    `INSERT INTO order_items
      (
        order_id,
        product_id,
        quantity,
        price
      )
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [
      order_id,
      product_id,
      quantity,
      price,
    ]
  );

  return result.rows[0];
};

const updateOrderItem = async (id, itemData) => {
  const allowedFields = [
    "quantity",
    "price",
  ];

  const fields = [];
  const values = [];

  for (const field of allowedFields) {
    if (itemData[field] !== undefined) {
      fields.push(field);
      values.push(itemData[field]);
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
    `UPDATE order_items
     SET ${setClause}
     WHERE id = $${values.length}
     RETURNING *`,
    values
  );

  return result.rows[0];
};

const deleteOrderItem = async (id) => {
  const result = await db.query(
    "DELETE FROM order_items WHERE id = $1 RETURNING *",
    [id]
  );

  return result.rows[0];
};

module.exports = {
  getAllOrderItems,
  getOrderItemById,
  createOrderItem,
  updateOrderItem,
  deleteOrderItem,
};