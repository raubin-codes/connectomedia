const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const { testConnection, initializeDatabase } = require('./config/database-postgres');
const contactRoutes = require('./routes/contact-postgres');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
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
    status: 'running',
    database: 'PostgreSQL'
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
      console.error('❌ Failed to connect to database.');
    } else {
      // Initialize database tables
      await initializeDatabase();
    }

    // Start server (Vercel handles this)
    if (process.env.NODE_ENV !== 'production') {
      app.listen(PORT, () => {
        console.log('\n🚀 Server is running!');
        console.log(`📡 API Server: http://localhost:${PORT}`);
        console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL}`);
        console.log('\n💡 Press Ctrl+C to stop the server\n');
      });
    }

  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
  }
}

startServer();

// Export for Vercel
module.exports = app;
