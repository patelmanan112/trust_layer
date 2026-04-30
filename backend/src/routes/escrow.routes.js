const express = require('express');
const { requireAuth } = require('../middleware/auth');
const {
  getEscrows, getEscrow, createEscrow, updateEscrowStatus, deleteEscrow, getEscrowSummary
} = require('../controllers/escrow.controller');

const router = express.Router();

router.use(requireAuth);

router.get('/summary', getEscrowSummary);
router.get('/',        getEscrows);
router.get('/:id',     getEscrow);
router.post('/',       createEscrow);
router.patch('/:id/status', updateEscrowStatus);
router.delete('/:id',  deleteEscrow);

module.exports = router;
