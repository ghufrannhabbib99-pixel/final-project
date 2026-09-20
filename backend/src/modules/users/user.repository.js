const db = require("../../config/db");

const getAllUsers = async () => {
  const result = await db.query(
    `SELECT
      id,
      name,
      email,
      role,
      created_at,
      updated_at
     FROM users
     ORDER BY created_at DESC`
  );

  return result.rows;
};

const getUserById = async (id) => {
  const result = await db.query(
    `SELECT
      id,
      name,
      email,
      role,
      created_at,
      updated_at
     FROM users
     WHERE id = $1`,
    [id]
  );

  return result.rows[0];
};

const createUser = async (userData) => {
  const {
    name,
    email,
    password,
    role,
  } = userData;

  const result = await db.query(
    `INSERT INTO users
      (
        name,
        email,
        password,
        role
      )
     VALUES ($1, $2, $3, $4)
     RETURNING
       id,
       name,
       email,
       role,
       created_at,
       updated_at`,
    [
      name,
      email,
      password,
      role || "user",
    ]
  );

  return result.rows[0];
};

const updateUser = async (id, userData) => {
  const allowedFields = [
    "name",
    "email",
    "password",
    "role",
  ];

  const fields = [];
  const values = [];

  for (const field of allowedFields) {
    if (userData[field] !== undefined) {
      fields.push(field);
      values.push(userData[field]);
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
    `UPDATE users
     SET ${setClause},
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $${values.length}
     RETURNING
       id,
       name,
       email,
       role,
       created_at,
       updated_at`,
    values
  );

  return result.rows[0];
};

const deleteUser = async (id) => {
  const result = await db.query(
    `DELETE FROM users
     WHERE id = $1
     RETURNING
       id,
       name,
       email,
       role`,
    [id]
  );

  return result.rows[0];
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};