const { User } = require("../models/User");

async function getProfile(req, res, next) {
  try {
    const user = await User.findById(req.user.sub).select("-passwordHash");
    if (!user) {
      const err = new Error("User not found");
      err.statusCode = 404;
      throw err;
    }
    return res.json({ user });
  } catch (e) {
    return next(e);
  }
}

async function updateProfile(req, res, next) {
  try {
    const { name, company } = req.body || {};
    
    const user = await User.findByIdAndUpdate(
      req.user.sub,
      { $set: { name, company } },
      { new: true, runValidators: true }
    ).select("-passwordHash");

    if (!user) {
      const err = new Error("User not found");
      err.statusCode = 404;
      throw err;
    }

    return res.json({ user });
  } catch (e) {
    return next(e);
  }
}

module.exports = { getProfile, updateProfile };
