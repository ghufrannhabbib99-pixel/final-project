const artisanRepository = require("./artisan.repository");

// Get all artisans
const getAllArtisans = async () => {
  return await artisanRepository.getAllArtisans();
};

// Get artisan by ID
const getArtisanById = async (id) => {
  const artisan = await artisanRepository.getArtisanById(id);

  if (!artisan) {
    throw new Error("Artisan not found");
  }

  return artisan;
};

// Create artisan
const createArtisan = async (artisanData) => {
  return await artisanRepository.createArtisan(artisanData);
};

// Update artisan
const updateArtisan = async (id, artisanData) => {
  const artisan = await artisanRepository.getArtisanById(id);

  if (!artisan) {
    throw new Error("Artisan not found");
  }

  return await artisanRepository.updateArtisan(
    id,
    artisanData
  );
};

// Delete artisan
const deleteArtisan = async (id) => {
  const artisan = await artisanRepository.getArtisanById(id);

  if (!artisan) {
    throw new Error("Artisan not found");
  }

  return await artisanRepository.deleteArtisan(id);
};

module.exports = {
  getAllArtisans,
  getArtisanById,
  createArtisan,
  updateArtisan,
  deleteArtisan,
};