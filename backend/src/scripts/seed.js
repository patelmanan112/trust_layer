const mongoose = require('mongoose');
require('dotenv').config({ path: __dirname + '/../../.env' });

const { User } = require('../models/User');
const Service = require('../models/Service');
const Transaction = require('../models/Transaction');
const Dispute = require('../models/Dispute');
const bcrypt = require('bcryptjs');

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Service.deleteMany({});
    await Transaction.deleteMany({});
    await Dispute.deleteMany({});
    console.log('Cleared existing users, services, transactions, and disputes.');

    // 1. Create Users (Client and Provider)
    const passwordHash = await bcrypt.hash('password123', 10);
    const client = await User.create({
      name: 'Alice Client',
      email: 'client@trustlayer.com',
      passwordHash,
      role: 'client'
    });

    const provider = await User.create({
      name: 'Bob Provider',
      email: 'provider@trustlayer.com',
      passwordHash,
      role: 'provider'
    });
    
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@trustlayer.com',
      passwordHash,
      role: 'admin'
    });
    console.log('Seeded Client, Provider, and Admin users.');

    // 2. Create Services
    const service1 = await Service.create({
      title: 'Web App Development',
      description: 'Full stack development of a minimal viable product.',
      price: 120000,
      category: 'Software Development',
      providerId: provider._id
    });
    const service2 = await Service.create({
      title: 'UI/UX Design Mockups',
      description: 'Figma mockups for 5 screens.',
      price: 45000,
      category: 'Design',
      providerId: provider._id
    });
    console.log('Seeded 2 services.');

    // 3. Create Transactions (Escrow)
    const txn1 = await Transaction.create({
      serviceId: service1._id,
      providerId: provider._id,
      clientId: client._id,
      amount: service1.price,
      status: 'held'
    });
    
    const txn2 = await Transaction.create({
      serviceId: service2._id,
      providerId: provider._id,
      clientId: client._id,
      amount: service2.price,
      status: 'disputed'
    });
    console.log('Seeded 2 transactions.');

    // 4. Create Dispute for txn2
    await Dispute.create({
      transactionId: txn2._id,
      reason: 'Service quality is poor',
      description: 'The designs delivered were not matching the requirements.',
      amount: txn2.amount,
      status: 'open',
      raisedBy: client._id
    });
    console.log('Seeded 1 dispute.');

    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();
