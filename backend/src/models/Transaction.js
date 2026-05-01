const mongoose = require('mongoose');

const TRANSACTION_STATUSES = ['held', 'delivered', 'completed', 'disputed', 'refunded'];

const transactionSchema = new mongoose.Schema(
  {
    transactionId: { type: String, unique: true }, // e.g. TXN-101
    serviceId:     { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    providerId:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    clientId:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount:        { type: Number, required: true, min: 0 },
    currency:      { type: String, default: 'INR' },
    status:        { type: String, enum: TRANSACTION_STATUSES, default: 'held' },
    proofUrl:      { type: String }, // Provided by provider when marking as delivered
    escrow:        { type: mongoose.Schema.Types.ObjectId, ref: 'Escrow' },
  },
  { timestamps: true }
);

// Auto-generate transactionId before saving
transactionSchema.pre('save', async function () {
  if (!this.transactionId) {
    const count = await mongoose.model('Transaction').countDocuments();
    this.transactionId = `TXN-${String(count + 100).padStart(3, '0')}`;
  }
});

module.exports = mongoose.model('Transaction', transactionSchema);
