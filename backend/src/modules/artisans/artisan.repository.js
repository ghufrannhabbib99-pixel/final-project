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
  const {
    craft_name,
    bio,
    city,
    experience_years,
    profile_image,
  } = artisanData;

  const result = await db.query(
    `UPDATE artisans
     SET
       craft_name = $1,
       bio = $2,
       city = $3,
       experience_years = $4,
       profile_image = $5,
       updated_at = CURRENT_TIMESTAMP
     WHERE id = $6
     RETURNING *`,
    [
      craft_name,
      bio,
      city,
      experience_years,
      profile_image,
      id,
    ]
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