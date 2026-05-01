const express = require("express");
const router = express.Router();

const { getProfile, updateProfile } = require("../controllers/user.controller");
const { requireAuth } = require("../middleware/auth");

router.get("/profile", requireAuth, getProfile);
router.put("/profile", requireAuth, updateProfile);

module.exports = router;
