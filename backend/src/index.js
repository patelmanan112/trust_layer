require('dotenv').config();
const app = require('./app');
const { connectDb } = require('./config/db');

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;

async function start() {
  try {
    if (!MONGO_URI) {
      console.error('❌ Error: MONGO_URI is not defined in environment variables.');
      process.exit(1);
    }

    // Mask URI for security in logs
    const maskedUri = MONGO_URI.replace(/:([^@]+)@/, ':****@');
    console.log(`📡 Database: ${maskedUri.split('@')[1] || 'Localhost'}`);

    await connectDb(MONGO_URI);
    console.log('✅ MongoDB connected');

    app.listen(PORT, () => {
      console.log(`🚀 TrustLayer API running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err.message);
    process.exit(1);
  }
}

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
});

start();
