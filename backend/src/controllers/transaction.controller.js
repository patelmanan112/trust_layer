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

const User = require('../models/User').User;

// POST /api/transactions
async function createTransaction(req, res, next) {
  try {
    console.log(`[DEBUG] createTransaction: user=${req.user?.sub}, role=${req.user?.role}`);
    
    const { serviceId, amount, providerEmail, customTitle } = req.body || {};
    if (!serviceId || amount == null) {
      const e = new Error('serviceId and amount are required'); e.statusCode = 400; throw e;
    }

    if (req.user.role !== 'client') {
      const e = new Error('Only clients can create transactions (pay for services)'); e.statusCode = 403; throw e;
    }

    let finalServiceId = serviceId;
    let providerId = null;

    if (serviceId === 'custom') {
      if (!providerEmail || !customTitle) {
        const e = new Error('providerEmail and customTitle are required for custom escrows'); e.statusCode = 400; throw e;
      }
      
      const existingUser = await User.findOne({ email: String(providerEmail).toLowerCase().trim() });
      if (!existingUser) {
        const e = new Error('No user found with that email. Please ensure the freelancer has registered.'); e.statusCode = 404; throw e;
      }
      
      if (existingUser.role !== 'provider') {
        const e = new Error(`The user '${providerEmail}' is registered as a ${existingUser.role}, not a freelancer. They must have a freelancer account to receive payments.`); e.statusCode = 400; throw e;
      }
      
      const provider = existingUser;
      
      // Create a one-off custom service
      const customService = await Service.create({
        providerId: provider._id,
        title: customTitle,
        description: 'Custom contract initiated by client',
        price: Number(amount),
        category: 'Custom'
      });
      
      finalServiceId = customService._id;
      providerId = provider._id;
    } else {
      const service = await Service.findById(serviceId);
      if (!service) {
        const e = new Error('Service not found'); e.statusCode = 404; throw e;
      }
      providerId = service.providerId;
    }

    const txn = await Transaction.create({
      serviceId: finalServiceId,
      providerId: providerId,
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
