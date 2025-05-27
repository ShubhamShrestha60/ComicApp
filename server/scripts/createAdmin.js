const mongoose = require('mongoose');
const User = require('../model/User');
require('dotenv').config();

const createAdmin = async () => {
  try {
    // Log the MongoDB URI (without sensitive parts)
    const mongoUri = process.env.MONGODB_URI;
    console.log('Attempting to connect to MongoDB...');
    console.log('MongoDB URI format:', mongoUri ? 'Present' : 'Missing');
    
    if (!mongoUri) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    // Connect to MongoDB
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB successfully');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      console.log('Admin user already exists:', {
        id: existingAdmin._id,
        username: existingAdmin.username,
        email: existingAdmin.email,
        role: existingAdmin.role
      });
      await mongoose.disconnect();
      return;
    }

    // Create admin user
    const adminUser = await User.create({
      username: 'admin',
      email: 'admin@comiczone.com',
      password: 'admin123',
      role: 'admin'
    });

    console.log('Admin user created successfully:', {
      id: adminUser._id,
      username: adminUser.username,
      email: adminUser.email,
      role: adminUser.role
    });

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error creating admin user:', error);
    if (error.name === 'MongoServerError') {
      console.error('MongoDB Error Code:', error.code);
      console.error('MongoDB Error Message:', error.message);
    }
    process.exit(1);
  }
};

createAdmin(); 