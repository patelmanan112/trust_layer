const express = require("express");
const router = express.Router();

const { getDisputes, createDispute, resolveDispute } = require("../controllers/dispute.controller");
const { requireAuth } = require("../middleware/auth");

router.get("/", requireAuth, getDisputes);
router.post("/", requireAuth, createDispute);
router.post("/:id/resolve", requireAuth, resolveDispute);

module.exports = router;
