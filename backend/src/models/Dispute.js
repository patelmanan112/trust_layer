const mongoose = require('mongoose');

const DISPUTE_STATUSES = ['open', 'under_review', 'resolved'];
const DISPUTE_REASONS = [
  'Service was not delivered',
  'Service quality is poor',
  'Overcharging has occurred',
  'Other',
];

const disputeSchema = new mongoose.Schema(
  {
    disputeId:     { type: String, unique: true }, // e.g. DSP-8821
    transactionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Transaction', required: true },
    reason:        { type: String, enum: DISPUTE_REASONS, required: true },
    description:   { type: String, required: true, trim: true },
    amount:        { type: Number, required: true, min: 0 },
    status:        { type: String, enum: DISPUTE_STATUSES, default: 'open' },
    proof:         { type: String }, // Optional string URL for evidence
    raisedBy:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    resolvedAt:    { type: Date },
    resolutionNote:{ type: String },
  },
  { timestamps: true }
);

// Auto-generate disputeId before saving
disputeSchema.pre('save', async function () {
  if (!this.disputeId) {
    const count = await mongoose.model('Dispute').countDocuments();
    this.disputeId = `DSP-${String(count + 8000).padStart(4, '0')}`;
  }
});

module.exports = mongoose.model('Dispute', disputeSchema);
