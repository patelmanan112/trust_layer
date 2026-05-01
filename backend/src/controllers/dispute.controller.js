const Dispute = require('../models/Dispute');
const Transaction = require('../models/Transaction');

// GET /api/disputes
async function getDisputes(req, res, next) {
  try {
    let query = {};
    if (req.user.role === 'client') {
      query.raisedBy = req.user.sub;
    } else if (req.user.role === 'admin') {
      // admin sees all disputes
    } else {
      // provider can see disputes against their transactions
      // To keep it simple, we could find transactions for provider, then disputes,
      // but for minimal flow, we will just return disputes if they are needed, or keep it admin/client focused.
    }
    const disputes = await Dispute.find(query).populate('transactionId').sort({ createdAt: -1 });
    return res.json({ disputes });
  } catch (e) { return next(e); }
}

// POST /api/disputes  — client raises a new dispute
async function createDispute(req, res, next) {
  try {
    const { transactionId, reason, description, proof } = req.body || {};
    
    if (req.user.role !== 'client') {
      const e = new Error('Only clients can raise disputes'); e.statusCode = 403; throw e;
    }

    if (!transactionId || !reason || !description) {
      const e = new Error('transactionId, reason, description are required');
      e.statusCode = 400; throw e;
    }

    const txn = await Transaction.findOne({ _id: transactionId, clientId: req.user.sub });
    if (!txn) {
      const e = new Error('Transaction not found'); e.statusCode = 404; throw e;
    }

    // Update transaction status
    txn.status = 'disputed';
    await txn.save();

    const dispute = await Dispute.create({
      transactionId,
      reason,
      description,
      amount: txn.amount,
      status: 'open',
      proof,
      raisedBy: req.user.sub,
    });
    return res.status(201).json({ dispute });
  } catch (e) { return next(e); }
}

// POST /api/disputes/:id/resolve  — admin resolves dispute
async function resolveDispute(req, res, next) {
  try {
    if (req.user.role !== 'admin') {
      const e = new Error('Only admins can resolve disputes'); e.statusCode = 403; throw e;
    }

    const { resolution, resolutionNote } = req.body || {}; // resolution: 'release' | 'refund'
    if (!['release', 'refund'].includes(resolution)) {
      const e = new Error('resolution must be "release" or "refund"'); e.statusCode = 400; throw e;
    }

    const dispute = await Dispute.findById(req.params.id);
    if (!dispute) { const e = new Error('Dispute not found'); e.statusCode = 404; throw e; }

    dispute.status = 'resolved';
    dispute.resolutionNote = resolutionNote || `Admin decided to ${resolution} payment.`;
    dispute.resolvedAt = new Date();
    await dispute.save();

    // Update Transaction
    const txn = await Transaction.findById(dispute.transactionId);
    if (txn) {
      txn.status = resolution === 'release' ? 'completed' : 'refunded';
      await txn.save();
    }

    return res.json({ message: `Dispute resolved and payment ${resolution}ed.`, dispute, transaction: txn });
  } catch (e) { return next(e); }
}

module.exports = { getDisputes, createDispute, resolveDispute };
