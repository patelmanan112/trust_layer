const mongoose = require('mongoose');

const TRANSACTION_STATUSES = ['Held', 'Released', 'Disputed', 'Refunded'];

const transactionSchema = new mongoose.Schema(
  {
    transactionId: { type: String, unique: true }, // e.g. TXN-101
    service:       { type: String, required: true, trim: true },
    provider:      { type: String, required: true, trim: true },
    amount:        { type: Number, required: true, min: 0 },
    currency:      { type: String, default: 'INR' },
    status:        { type: String, enum: TRANSACTION_STATUSES, default: 'Held' },
    escrow:        { type: mongoose.Schema.Types.ObjectId, ref: 'Escrow' },
    client:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

// Auto-generate transactionId before saving
transactionSchema.pre('save', async function (next) {
  if (!this.transactionId) {
    const count = await mongoose.model('Transaction').countDocuments();
    this.transactionId = `TXN-${String(count + 100).padStart(3, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Transaction', transactionSchema);
