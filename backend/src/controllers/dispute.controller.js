const path = require('path');
const Dispute = require('../models/Dispute');

// GET /api/disputes
async function getDisputes(req, res, next) {
  try {
    const { status } = req.query;
    const query = { raisedBy: req.user.sub };
    if (status) query.status = status;
    const disputes = await Dispute.find(query).sort({ createdAt: -1 });
    return res.json({ disputes });
  } catch (e) { return next(e); }
}

// GET /api/disputes/:id
async function getDispute(req, res, next) {
  try {
    const dispute = await Dispute.findOne({ _id: req.params.id, raisedBy: req.user.sub });
    if (!dispute) { const e = new Error('Dispute not found'); e.statusCode = 404; throw e; }
    return res.json({ dispute });
  } catch (e) { return next(e); }
}

// POST /api/disputes  — raise a new dispute
async function createDispute(req, res, next) {
  try {
    const { transactionId, provider, reason, description, amount } = req.body || {};
    if (!transactionId || !provider || !reason || !description || amount == null) {
      const e = new Error('transactionId, provider, reason, description and amount are required');
      e.statusCode = 400; throw e;
    }
    const dispute = await Dispute.create({
      transactionId, provider, reason, description,
      amount: Number(amount),
      raisedBy: req.user.sub,
    });
    return res.status(201).json({ dispute });
  } catch (e) { return next(e); }
}

// POST /api/disputes/:id/proof  — upload proof files (handled by multer in route)
async function submitProof(req, res, next) {
  try {
    const dispute = await Dispute.findOne({ _id: req.params.id, raisedBy: req.user.sub });
    if (!dispute) { const e = new Error('Dispute not found'); e.statusCode = 404; throw e; }
    if (dispute.status === 'Resolved') {
      const e = new Error('Cannot add proof to a resolved dispute'); e.statusCode = 400; throw e;
    }

    const files = req.files || [];
    if (files.length === 0) {
      const e = new Error('At least one file is required'); e.statusCode = 400; throw e;
    }

    const newProof = files.map(f => ({
      filename:     f.filename,
      originalName: f.originalname,
      mimetype:     f.mimetype,
      size:         f.size,
      url:          `/uploads/${f.filename}`,
    }));

    dispute.proof.push(...newProof);
    // Move to Under Review once proof is submitted
    if (dispute.status === 'Open') dispute.status = 'Under Review';
    await dispute.save();

    return res.json({ dispute });
  } catch (e) { return next(e); }
}

// PATCH /api/disputes/:id/status  — admin updates status
async function updateDisputeStatus(req, res, next) {
  try {
    const { status, resolutionNote } = req.body || {};
    if (!status) { const e = new Error('status is required'); e.statusCode = 400; throw e; }
    const update = { status };
    if (resolutionNote) update.resolutionNote = resolutionNote;
    if (status === 'Resolved') update.resolvedAt = new Date();
    const dispute = await Dispute.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true });
    if (!dispute) { const e = new Error('Dispute not found'); e.statusCode = 404; throw e; }
    return res.json({ dispute });
  } catch (e) { return next(e); }
}

// GET /api/disputes/summary
async function getDisputeSummary(req, res, next) {
  try {
    const disputes = await Dispute.find({ raisedBy: req.user.sub });
    const summary = { Open: 0, 'Under Review': 0, Resolved: 0, total: disputes.length };
    disputes.forEach(d => { if (summary[d.status] != null) summary[d.status]++; });
    return res.json(summary);
  } catch (e) { return next(e); }
}

module.exports = { getDisputes, getDispute, createDispute, submitProof, updateDisputeStatus, getDisputeSummary };
