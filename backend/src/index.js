require('dotenv').config();
// Server updated at 2026-05-01 21:27
const app        = require('./app');
const { connectDb } = require('./config/db');

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await connectDb(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => {
      console.log(`🚀 TrustLayer API running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err.message);
    process.exit(1);
  }
}

start();
