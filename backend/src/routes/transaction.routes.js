const express = require("express");
const router = express.Router();

const { getTransactions, createTransaction, completeTransaction, verifyTransaction } = require("../controllers/transaction.controller");
const { requireAuth } = require("../middleware/auth");

router.get("/", requireAuth, getTransactions);
router.post("/", requireAuth, createTransaction);
router.post("/:id/complete", requireAuth, completeTransaction);
router.post("/:id/verify", requireAuth, verifyTransaction);

module.exports = router;
