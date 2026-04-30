const mongoose = require("mongoose");

async function connectDb(uri) {
  if (!uri) {
    const err = new Error("MONGODB_URI is required");
    err.statusCode = 500;
    throw err;
  }

  mongoose.set("strictQuery", true);
  await mongoose.connect(uri);
  return mongoose.connection;
}

module.exports = { connectDb };

