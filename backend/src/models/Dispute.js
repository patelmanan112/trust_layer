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
    clientId:      { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    providerId:    { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    reason:        { type: String, enum: DISPUTE_REASONS, required: true },
    description:   { type: String, required: true, trim: true },
    status:        { type: String, enum: DISPUTE_STATUSES, default: 'open' },
    proof:         [{ type: String }], // Array of file paths/URLs for evidence
    raisedBy:      { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    resolvedAt:    { type: Date },
    resolutionNote:{ type: String },
  },
  { 
    timestamps: true,
    strictPopulate: false 
  }
);

// Auto-generate disputeId before saving
disputeSchema.pre('save', async function () {
  if (!this.disputeId) {
    const count = await mongoose.model('Dispute').countDocuments();
    this.disputeId = `DSP-${String(count + 8001).padStart(4, '0')}`;
  }
});

module.exports = mongoose.model('Dispute', disputeSchema);
