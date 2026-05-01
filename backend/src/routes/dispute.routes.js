const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const { 
  getDisputes, 
  getDisputeSummary, 
  createDispute, 
  uploadProof, 
  resolveDispute 
} = require("../controllers/dispute.controller");
const { requireAuth } = require("../middleware/auth");

// Multer setup for proof uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.get("/", requireAuth, getDisputes);
router.get("/summary", requireAuth, getDisputeSummary);
router.post("/", requireAuth, createDispute);
router.post("/:id/proof", requireAuth, upload.array("proof", 5), uploadProof);
router.post("/:id/resolve", requireAuth, resolveDispute);

module.exports = router;
