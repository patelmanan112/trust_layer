const { User } = require("../models/User");

async function getDashboard(req, res, next) {
  try {
    const userId = req.user?.sub;
    const user = userId ? await User.findById(userId) : null;

    return res.json({
      message: "Dashboard data",
      user: user
        ? {
            id: user._id.toString(),
            fullName: user.fullName,
            email: user.email,
            role: user.role,
          }
        : null,
      role: req.user?.role || null,
    });
  } catch (e) {
    return next(e);
  }
}

module.exports = { getDashboard };

