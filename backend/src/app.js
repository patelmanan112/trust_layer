const express = require('express');
const cors    = require('cors');
const path    = require('path');

const authRoutes        = require('./routes/auth.routes');
const dashboardRoutes   = require('./routes/dashboard.routes');
const escrowRoutes      = require('./routes/escrow.routes');
const transactionRoutes = require('./routes/transaction.routes');
const disputeRoutes     = require('./routes/dispute.routes');
const userRoutes        = require('./routes/user.routes');
const serviceRoutes     = require('./routes/service.routes');
const notesRoutes       = require('./routes/notes.routes');
const morgan            = require('morgan');

const app = express();

// ── Middleware ──────────────────────────────────────────────
const clientOrigin = process.env.CLIENT_ORIGIN 
  ? process.env.CLIENT_ORIGIN.replace(/\/$/, "") 
  : 'http://localhost:5173';

app.use(cors({
  origin: clientOrigin,
  credentials: true,
}));
app.use(morgan('dev'));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve uploaded proof files as static assets
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// ── Routes ──────────────────────────────────────────────────
app.use('/api/auth',         authRoutes);
app.use('/api/dashboard',    dashboardRoutes);
app.use('/api/escrows',      escrowRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/disputes',     disputeRoutes);
app.use('/api/users',        userRoutes);
app.use('/api/services',     serviceRoutes);
app.use('/api/notes',        notesRoutes);

// ── Health check ────────────────────────────────────────────
app.get('/api/health', (_req, res) => res.json({ status: 'ok', timestamp: new Date() }));

// ── Global error handler ────────────────────────────────────
app.use((err, _req, res, _next) => {
  const status = err.statusCode || err.status || 500;
  res.status(status).json({ message: err.message || 'Internal Server Error' });
});

module.exports = app;
