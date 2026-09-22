const adminService = require("./admin.service");

const getDashboardStats = async (req, res) => {
  try {
    const stats = await adminService.getDashboardStats();

    res.status(200).json(stats);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch dashboard statistics",
    });
  }
};

module.exports = {
  getDashboardStats,
};