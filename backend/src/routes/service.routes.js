const express = require("express");
const router = express.Router();

const { createService, getServices } = require("../controllers/service.controller");
const { requireAuth } = require("../middleware/auth");

router.post("/", requireAuth, createService);
router.get("/", getServices); // Public or requireAuth depending on requirements, let's keep it open or at least returning data

module.exports = router;
