const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../../config/db");

const register = async (userData) => {
  const { name, email, password } = userData;

  const existingUser = await db.query(
    `SELECT id
     FROM users
     WHERE email = $1`,
    [email]
  );

  if (existingUser.rows.length > 0) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

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
       created_at`,
    [
      name,
      email,
      hashedPassword,
      "user",
    ]
  );

  const user = result.rows[0];

  const token = jwt.sign(
    {
      userId: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  return {
    user,
    token,
  };
};

const login = async (email, password) => {
  const result = await db.query(
    `SELECT
      id,
      name,
      email,
      password,
      role
     FROM users
     WHERE email = $1`,
    [email]
  );

  const user = result.rows[0];

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign(
    {
      userId: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  delete user.password;

  return {
    user,
    token,
  };
};

module.exports = {
  register,
  login,
};