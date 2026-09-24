const db = require("../../config/db");

// Get all artisans
const getAllArtisans = async () => {
  const result = await db.query(
    `SELECT
      a.*,
      u.name AS artisan_name,
      u.email AS artisan_email
     FROM artisans a
     JOIN users u ON u.id = a.user_id
     ORDER BY a.created_at DESC`
  );

  return result.rows;
};

// Get artisan by ID
const getArtisanById = async (id) => {
  const result = await db.query(
    `SELECT
      a.*,
      u.name AS artisan_name,
      u.email AS artisan_email
     FROM artisans a
     JOIN users u ON u.id = a.user_id
     WHERE a.id = $1`,
    [id]
  );

  return result.rows[0];
};

// Create artisan
const createArtisan = async (artisanData) => {
  const {
    user_id,
    craft_name,
    bio,
    city,
    experience_years,
    profile_image,
    story,
    specialties,
    work_style,
  } = artisanData;

  const result = await db.query(
    `INSERT INTO artisans
      (
        user_id,
        craft_name,
        bio,
        city,
        experience_years,
        profile_image,
        story,
        specialties,
        work_style
      )
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     RETURNING *`,
    [
      user_id,
      craft_name,
      bio,
      city,
      experience_years,
      profile_image,
      story,
      specialties,
      work_style,
    ]
  );

  return result.rows[0];
};

// Update artisan
const updateArtisan = async (id, artisanData) => {
  const allowedFields = [
    "craft_name",
    "bio",
    "city",
    "experience_years",
    "profile_image",
    "story",
    "specialties",
    "work_style",
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

// Delete artisan
const deleteArtisan = async (id) => {
  const result = await db.query(
    `DELETE FROM artisans
     WHERE id = $1
     RETURNING *`,
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