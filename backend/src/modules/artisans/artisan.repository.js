const db = require("../../config/db");

const getAllArtisans = async () => {
  const result = await db.query(
    "SELECT * FROM artisans ORDER BY created_at DESC"
  );

  return result.rows;
};

const getArtisanById = async (id) => {
  const result = await db.query(
    "SELECT * FROM artisans WHERE id = $1",
    [id]
  );

  return result.rows[0];
};

const createArtisan = async (artisanData) => {
  const {
    user_id,
    craft_name,
    bio,
    city,
    experience_years,
    profile_image,
  } = artisanData;

  const result = await db.query(
    `INSERT INTO artisans
      (user_id, craft_name, bio, city, experience_years, profile_image)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [
      user_id,
      craft_name,
      bio,
      city,
      experience_years,
      profile_image,
    ]
  );

  return result.rows[0];
};

const updateArtisan = async (id, artisanData) => {
  const allowedFields = [
    "craft_name",
    "bio",
    "city",
    "experience_years",
    "profile_image",
  ];

  const fields = [];
  const values = [];

  for (const field of allowedFields) {
    if (artisanData[field] !== undefined) {
      fields.push(field);
      values.push(artisanData[field]);
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
    `UPDATE artisans
     SET ${setClause},
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $${values.length}
     RETURNING *`,
    values
  );

  return result.rows[0];
};

const deleteArtisan = async (id) => {
  const result = await db.query(
    "DELETE FROM artisans WHERE id = $1 RETURNING *",
    [id]
  );

  return result.rows[0];
};

module.exports = {
  getAllArtisans,
  getArtisanById,
  createArtisan,
  updateArtisan,
  deleteArtisan,
};