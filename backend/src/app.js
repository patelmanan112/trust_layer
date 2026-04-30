const express = require('express');
const cors    = require('cors');
const path    = require('path');

const authRoutes        = require('./routes/auth.routes');
const dashboardRoutes   = require('./routes/dashboard.routes');
const escrowRoutes      = require('./routes/escrow.routes');
const transactionRoutes = require('./routes/transaction.routes');
const disputeRoutes     = require('./routes/dispute.routes');

const app = express();

// ── Middleware ──────────────────────────────────────────────
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded proof files as static assets
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// ── Routes ──────────────────────────────────────────────────
app.use('/api/auth',         authRoutes);
app.use('/api/dashboard',    dashboardRoutes);
app.use('/api/escrows',      escrowRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/disputes',     disputeRoutes);

// ── Health check ────────────────────────────────────────────
app.get('/api/health', (_req, res) => res.json({ status: 'ok', timestamp: new Date() }));

// ── Global error handler ────────────────────────────────────
app.use((err, _req, res, _next) => {
  const status = err.statusCode || err.status || 500;
  res.status(status).json({ message: err.message || 'Internal Server Error' });
});

module.exports = app;
