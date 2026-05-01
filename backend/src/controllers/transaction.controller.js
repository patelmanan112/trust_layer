const Transaction = require('../models/Transaction');
const Service = require('../models/Service');
const Dispute = require('../models/Dispute');

// GET /api/transactions
async function getTransactions(req, res, next) {
  try {
    let query = {};
    if (req.user.role === 'client') {
      query.clientId = req.user.sub;
    } else if (req.user.role === 'provider') {
      query.providerId = req.user.sub;
    }
    const transactions = await Transaction.find(query)
      .populate('serviceId')
      .populate('clientId', 'name email')
      .populate('providerId', 'name email')
      .sort({ createdAt: -1 });
    return res.json({ transactions });
  } catch (e) { return next(e); }
}

// POST /api/transactions
async function createTransaction(req, res, next) {
  try {
    const { serviceId, amount } = req.body || {};
    if (!serviceId || amount == null) {
      const e = new Error('serviceId and amount are required'); e.statusCode = 400; throw e;
    }

    if (req.user.role !== 'client') {
      const e = new Error('Only clients can create transactions (pay for services)'); e.statusCode = 403; throw e;
    }

    const service = await Service.findById(serviceId);
    if (!service) {
      const e = new Error('Service not found'); e.statusCode = 404; throw e;
    }

    const txn = await Transaction.create({
      serviceId,
      providerId: service.providerId,
      clientId: req.user.sub,
      amount: Number(amount),
      status: 'held',
    });
    return res.status(201).json({ transaction: txn });
  } catch (e) { return next(e); }
}

// POST /api/transactions/:id/complete
// Provider marks service as completed and provides proof string
async function completeTransaction(req, res, next) {
  try {
    if (req.user.role !== 'provider') {
      const e = new Error('Only providers can complete transactions'); e.statusCode = 403; throw e;
    }

    const { proofUrl } = req.body || {};

    const txn = await Transaction.findOneAndUpdate(
      { _id: req.params.id, providerId: req.user.sub, status: 'held' },
      { status: 'delivered', proofUrl },
      { new: true }
    );
    
    if (!txn) {
      const e = new Error('Transaction not found or not in held state'); e.statusCode = 404; throw e;
    }
    
    return res.json({ transaction: txn });
  } catch (e) { return next(e); }
}

// POST /api/transactions/:id/verify
async function verifyTransaction(req, res, next) {
  try {
    const { action, reason, description } = req.body || {}; // action = 'accept' | 'reject'
    
    if (req.user.role !== 'client') {
      const e = new Error('Only clients can verify transactions'); e.statusCode = 403; throw e;
    }

    const txn = await Transaction.findOne({ _id: req.params.id, clientId: req.user.sub });
    if (!txn) {
      const e = new Error('Transaction not found'); e.statusCode = 404; throw e;
    }

    if (action === 'accept') {
      txn.status = 'completed';
      await txn.save();
      return res.json({ message: 'Service accepted, transaction completed.', transaction: txn });
    } else if (action === 'reject') {
      txn.status = 'disputed';
      await txn.save();

      // Automatically create dispute
      const dispute = await Dispute.create({
        transactionId: txn._id,
        reason: reason || 'Service was not delivered',
        description: description || 'Client rejected the service.',
        amount: txn.amount,
        status: 'open',
        raisedBy: req.user.sub
      });

      return res.json({ message: 'Service rejected, dispute created.', transaction: txn, dispute });
    } else {
      const e = new Error('Invalid action. Must be accept or reject.'); e.statusCode = 400; throw e;
    }
  } catch (e) { return next(e); }
}

module.exports = { getTransactions, createTransaction, completeTransaction, verifyTransaction };
