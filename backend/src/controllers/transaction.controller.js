const Transaction = require('../models/Transaction');

// GET /api/transactions
async function getTransactions(req, res, next) {
  try {
    const { status, search } = req.query;
    const query = { client: req.user.sub };
    if (status && status !== 'All') query.status = status;
    if (search) {
      query.$or = [
        { service:  { $regex: search, $options: 'i' } },
        { provider: { $regex: search, $options: 'i' } },
      ];
    }
    const transactions = await Transaction.find(query).sort({ createdAt: -1 });
    return res.json({ transactions });
  } catch (e) { return next(e); }
}

// GET /api/transactions/:id
async function getTransaction(req, res, next) {
  try {
    const txn = await Transaction.findOne({ _id: req.params.id, client: req.user.sub });
    if (!txn) { const e = new Error('Transaction not found'); e.statusCode = 404; throw e; }
    return res.json({ transaction: txn });
  } catch (e) { return next(e); }
}

// POST /api/transactions
async function createTransaction(req, res, next) {
  try {
    const { service, provider, amount, currency, escrow } = req.body || {};
    if (!service || !provider || amount == null) {
      const e = new Error('service, provider, and amount are required'); e.statusCode = 400; throw e;
    }
    const txn = await Transaction.create({
      service, provider,
      amount: Number(amount),
      currency: currency || 'INR',
      escrow: escrow || undefined,
      client: req.user.sub,
    });
    return res.status(201).json({ transaction: txn });
  } catch (e) { return next(e); }
}

// PATCH /api/transactions/:id/status
async function updateTransactionStatus(req, res, next) {
  try {
    const { status } = req.body || {};
    if (!status) { const e = new Error('status is required'); e.statusCode = 400; throw e; }
    const txn = await Transaction.findOneAndUpdate(
      { _id: req.params.id, client: req.user.sub },
      { status }, { new: true, runValidators: true }
    );
    if (!txn) { const e = new Error('Transaction not found'); e.statusCode = 404; throw e; }
    return res.json({ transaction: txn });
  } catch (e) { return next(e); }
}

// GET /api/transactions/summary
async function getTransactionSummary(req, res, next) {
  try {
    const txns = await Transaction.find({ client: req.user.sub });
    const summary = { Held: 0, Released: 0, Disputed: 0, Refunded: 0, total: txns.length };
    txns.forEach(t => { if (summary[t.status] != null) summary[t.status]++; });
    const totalVolume = txns.reduce((s, t) => s + t.amount, 0);
    return res.json({ ...summary, totalVolume });
  } catch (e) { return next(e); }
}

module.exports = { getTransactions, getTransaction, createTransaction, updateTransactionStatus, getTransactionSummary };
