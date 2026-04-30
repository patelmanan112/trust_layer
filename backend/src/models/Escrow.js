const mongoose = require('mongoose');

const ESCROW_STATUSES = ['AWAITING_PROVIDER', 'READY_FOR_VERIFICATION', 'COMPLETED', 'DISPUTED', 'REFUNDED'];
const ESCROW_TYPES = ['ongoing', 'verify', 'completed'];

const escrowSchema = new mongoose.Schema(
  {
    escrowId:     { type: String, unique: true }, // e.g. ESC-8832
    title:        { type: String, required: true, trim: true },
    provider:     { type: String, required: true, trim: true },
    amount:       { type: Number, required: true, min: 0 },
    currency:     { type: String, default: 'INR' },
    status:       { type: String, enum: ESCROW_STATUSES, default: 'AWAITING_PROVIDER' },
    statusDesc:   { type: String, default: '' },
    type:         { type: String, enum: ESCROW_TYPES, default: 'ongoing' },
    client:       { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

// Auto-generate escrowId before saving
escrowSchema.pre('save', async function (next) {
  if (!this.escrowId) {
    const count = await mongoose.model('Escrow').countDocuments();
    this.escrowId = `ESC-${String(count + 1000).padStart(4, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Escrow', escrowSchema);
