const Escrow = require('../models/Escrow');

// GET /api/escrows  — list all escrows for logged-in user
async function getEscrows(req, res, next) {
  try {
    const escrows = await Escrow.find({ client: req.user.sub }).sort({ createdAt: -1 });
    return res.json({ escrows });
  } catch (e) { return next(e); }
}

// GET /api/escrows/:id
async function getEscrow(req, res, next) {
  try {
    const escrow = await Escrow.findOne({ _id: req.params.id, client: req.user.sub });
    if (!escrow) { const e = new Error('Escrow not found'); e.statusCode = 404; throw e; }
    return res.json({ escrow });
  } catch (e) { return next(e); }
}

// POST /api/escrows
async function createEscrow(req, res, next) {
  try {
    const { title, provider, amount, currency, statusDesc } = req.body || {};
    if (!title || !provider || amount == null) {
      const e = new Error('title, provider, and amount are required'); e.statusCode = 400; throw e;
    }
    const escrow = await Escrow.create({
      title, provider,
      amount: Number(amount),
      currency: currency || 'INR',
      statusDesc: statusDesc || '',
      client: req.user.sub,
    });
    return res.status(201).json({ escrow });
  } catch (e) { return next(e); }
}

// PATCH /api/escrows/:id/status
async function updateEscrowStatus(req, res, next) {
  try {
    const { status, statusDesc, type } = req.body || {};
    const update = {};
    if (status)     update.status = status;
    if (statusDesc) update.statusDesc = statusDesc;
    if (type)       update.type = type;
    const escrow = await Escrow.findOneAndUpdate(
      { _id: req.params.id, client: req.user.sub },
      update, { new: true, runValidators: true }
    );
    if (!escrow) { const e = new Error('Escrow not found'); e.statusCode = 404; throw e; }
    return res.json({ escrow });
  } catch (e) { return next(e); }
}

// DELETE /api/escrows/:id
async function deleteEscrow(req, res, next) {
  try {
    const escrow = await Escrow.findOneAndDelete({ _id: req.params.id, client: req.user.sub });
    if (!escrow) { const e = new Error('Escrow not found'); e.statusCode = 404; throw e; }
    return res.json({ message: 'Escrow deleted' });
  } catch (e) { return next(e); }
}

// GET /api/escrows/summary — metrics for dashboard
async function getEscrowSummary(req, res, next) {
  try {
    const escrows = await Escrow.find({ client: req.user.sub });
    const totalHeld = escrows.filter(e => ['AWAITING_PROVIDER', 'READY_FOR_VERIFICATION'].includes(e.status))
      .reduce((sum, e) => sum + e.amount, 0);
    const ongoing = escrows.filter(e => e.type === 'ongoing').length;
    const actionRequired = escrows.filter(e => e.type === 'verify').length;
    return res.json({ totalHeld, ongoing, actionRequired, total: escrows.length });
  } catch (e) { return next(e); }
}

module.exports = { getEscrows, getEscrow, createEscrow, updateEscrowStatus, deleteEscrow, getEscrowSummary };
