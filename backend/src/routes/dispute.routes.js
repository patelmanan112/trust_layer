const express = require('express');
const multer  = require('multer');
const path    = require('path');
const fs      = require('fs');
const { requireAuth, requireRole } = require('../middleware/auth');
const {
  getDisputes, getDispute, createDispute, submitProof, updateDisputeStatus, getDisputeSummary
} = require('../controllers/dispute.controller');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

// Multer v2 disk storage
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename:    (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB per file
});

const router = express.Router();

router.use(requireAuth);

router.get('/summary',      getDisputeSummary);
router.get('/',             getDisputes);
router.get('/:id',          getDispute);
router.post('/',            createDispute);
router.post('/:id/proof',   upload.array('proof', 5), submitProof);
// Admin / arbitrator only
router.patch('/:id/status', requireRole(['admin', 'arbitrator']), updateDisputeStatus);

module.exports = router;
