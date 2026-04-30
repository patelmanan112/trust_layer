const mongoose = require('mongoose');

const DISPUTE_STATUSES = ['Open', 'Under Review', 'Resolved'];
const DISPUTE_REASONS = [
  'Service was not delivered',
  'Service quality is poor',
  'Overcharging has occurred',
  'Other',
];

const proofSchema = new mongoose.Schema(
  {
    filename:    { type: String, required: true },
    originalName:{ type: String },
    mimetype:    { type: String },
    size:        { type: Number },
    url:         { type: String }, // stored path or cloud URL
    uploadedAt:  { type: Date, default: Date.now },
  },
  { _id: false }
);

const disputeSchema = new mongoose.Schema(
  {
    disputeId:     { type: String, unique: true }, // e.g. DSP-8821
    transactionId: { type: String, required: true }, // references Transaction.transactionId
    transaction:   { type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' },
    provider:      { type: String, required: true, trim: true },
    reason:        { type: String, enum: DISPUTE_REASONS, required: true },
    description:   { type: String, required: true, trim: true },
    amount:        { type: Number, required: true, min: 0 },
    status:        { type: String, enum: DISPUTE_STATUSES, default: 'Open' },
    proof:         { type: [proofSchema], default: [] },
    raisedBy:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    resolvedAt:    { type: Date },
    resolutionNote:{ type: String },
  },
  { timestamps: true }
);

// Auto-generate disputeId before saving
disputeSchema.pre('save', async function (next) {
  if (!this.disputeId) {
    const count = await mongoose.model('Dispute').countDocuments();
    this.disputeId = `DSP-${String(count + 8000).padStart(4, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Dispute', disputeSchema);
