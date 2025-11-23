const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const { testConnection, initializeDatabase } = require('./config/database');
const contactRoutes = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://127.0.0.1:5500',
  credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Connectomedia API Server',
    version: '1.0.0',
    status: 'running'
  });
});

app.use('/api/contact', contactRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// Initialize database and start server
async function startServer() {
  try {
    // Test database connection
    const isConnected = await testConnection();
    
    if (!isConnected) {
      console.error('❌ Failed to connect to database. Please check your configuration.');
      console.log('\n📝 Setup Instructions:');
      console.log('1. Make sure MySQL is installed and running');
      console.log('2. Update .env file with your database credentials');
      console.log('3. Create database: CREATE DATABASE connectomedia_db;');
      process.exit(1);
    }

    // Initialize database tables
    await initializeDatabase();

    // Start server
    app.listen(PORT, () => {
      console.log('\n🚀 Server is running!');
      console.log(`📡 API Server: http://localhost:${PORT}`);
      console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL}`);
      console.log(`📊 Database: ${process.env.DB_NAME}`);
      console.log('\n✨ Available endpoints:');
      console.log(`   GET  http://localhost:${PORT}/`);
      console.log(`   POST http://localhost:${PORT}/api/contact`);
      console.log(`   GET  http://localhost:${PORT}/api/contact`);
      console.log('\n💡 Press Ctrl+C to stop the server\n');
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
}

startServer();
