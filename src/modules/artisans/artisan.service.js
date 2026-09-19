const artisanRepository = require("./artisan.repository");

const getAllArtisans = async () => {
  return await artisanRepository.getAllArtisans();
};

const getArtisanById = async (id) => {
  return await artisanRepository.getArtisanById(id);
};

const createArtisan = async (artisanData) => {
  return await artisanRepository.createArtisan(artisanData);
};

const updateArtisan = async (id, artisanData) => {
  return await artisanRepository.updateArtisan(id, artisanData);
};

const deleteArtisan = async (id) => {
  return await artisanRepository.deleteArtisan(id);
};

module.exports = {
  getAllArtisans,
  getArtisanById,
  createArtisan,
  updateArtisan,
  deleteArtisan,
};