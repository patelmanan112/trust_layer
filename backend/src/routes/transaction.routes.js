const express = require('express');
const { requireAuth } = require('../middleware/auth');
const {
  getTransactions, getTransaction, createTransaction, updateTransactionStatus, getTransactionSummary
} = require('../controllers/transaction.controller');

const router = express.Router();

router.use(requireAuth);

router.get('/summary', getTransactionSummary);
router.get('/',        getTransactions);
router.get('/:id',     getTransaction);
router.post('/',       createTransaction);
router.patch('/:id/status', updateTransactionStatus);

module.exports = router;
