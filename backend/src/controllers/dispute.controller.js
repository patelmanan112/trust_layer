const Dispute = require("../models/Dispute");
const Transaction = require("../models/Transaction");

// @desc    Get all disputes
// @route   GET /api/disputes
exports.getDisputes = async (req, res) => {
  try {
    const disputes = await Dispute.find()
      .populate("transactionId", "transactionId amount")
      .populate("providerId", "name")
      .populate("clientId", "name")
      .sort({ createdAt: -1 });

    res.json({ disputes });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get dispute summary (counts)
// @route   GET /api/disputes/summary
exports.getDisputeSummary = async (req, res) => {
  try {
    const open = await Dispute.countDocuments({ status: "open" });
    const underReview = await Dispute.countDocuments({ status: "under_review" });
    const resolved = await Dispute.countDocuments({ status: "resolved" });

    res.json({
      Open: open,
      "Under Review": underReview,
      Resolved: resolved,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Create a dispute
// @route   POST /api/disputes
exports.createDispute = async (req, res) => {
  const { transactionId, reason, description } = req.body;

  try {
    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    const dispute = new Dispute({
      transactionId,
      clientId: transaction.clientId,
      providerId: transaction.providerId,
      reason,
      description,
      status: "open",
      raisedBy: req.user.id, // Set the user who raised the dispute
    });

    await dispute.save();

    // Update transaction status
    transaction.status = "disputed";
    await transaction.save();

    res.status(201).json({ dispute });
  } catch (err) {
    console.error("Create Dispute Error:", err);
    res.status(400).json({ message: err.message });
  }
};

// @desc    Upload proof for a dispute
// @route   POST /api/disputes/:id/proof
exports.uploadProof = async (req, res) => {
  try {
    const dispute = await Dispute.findById(req.params.id);
    if (!dispute) {
      return res.status(404).json({ message: "Dispute not found" });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const filePaths = req.files.map((file) => file.path);
    dispute.proof = [...dispute.proof, ...filePaths];
    dispute.status = "under_review";
    await dispute.save();

    res.json({ message: "Proof uploaded successfully", proof: dispute.proof });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Resolve a dispute (Admin only)
// @route   POST /api/disputes/:id/resolve
exports.resolveDispute = async (req, res) => {
  const { decision } = req.body; // 'refund' or 'release'

  try {
    const dispute = await Dispute.findById(req.params.id);
    if (!dispute) {
      return res.status(404).json({ message: "Dispute not found" });
    }

    const transaction = await Transaction.findById(dispute.transactionId);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    if (decision === "refund") {
      transaction.status = "refunded";
    } else if (decision === "release") {
      transaction.status = "completed";
    } else {
      return res.status(400).json({ message: "Invalid decision" });
    }

    dispute.status = "resolved";
    await dispute.save();
    await transaction.save();

    res.json({ message: "Dispute resolved", status: transaction.status });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
