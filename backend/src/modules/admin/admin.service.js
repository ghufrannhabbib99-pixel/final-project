const adminRepository = require("./admin.repository");

const getDashboardStats = async () => {
  return await adminRepository.getDashboardStats();
};

module.exports = {
  getDashboardStats,
};