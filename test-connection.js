// Simple script to test database connection
require('dotenv').config();
const { testConnection, initializeDatabase, promisePool } = require('./config/database');

async function runTests() {
  console.log('🧪 Testing Database Connection...\n');

  // Test 1: Connection
  console.log('Test 1: Database Connection');
  const isConnected = await testConnection();
  if (!isConnected) {
    console.log('❌ Connection test failed!');
    process.exit(1);
  }

  // Test 2: Initialize tables
  console.log('\nTest 2: Initialize Tables');
  try {
    await initializeDatabase();
    console.log('✅ Tables initialized successfully!');
  } catch (error) {
    console.log('❌ Table initialization failed:', error.message);
    process.exit(1);
  }

  // Test 3: Insert test data
  console.log('\nTest 3: Insert Test Data');
  try {
    const [result] = await promisePool.query(
      'INSERT INTO contact_messages (name, email, company, message) VALUES (?, ?, ?, ?)',
      ['Test User', 'test@example.com', 'Test Company', 'This is a test message']
    );
    console.log('✅ Test data inserted! ID:', result.insertId);

    // Test 4: Retrieve data
    console.log('\nTest 4: Retrieve Data');
    const [rows] = await promisePool.query('SELECT * FROM contact_messages WHERE id = ?', [result.insertId]);
    console.log('✅ Data retrieved successfully!');
    console.log('Data:', rows[0]);

    // Clean up test data
    console.log('\nCleaning up test data...');
    await promisePool.query('DELETE FROM contact_messages WHERE id = ?', [result.insertId]);
    console.log('✅ Test data cleaned up!');

  } catch (error) {
    console.log('❌ Test failed:', error.message);
    process.exit(1);
  }

  console.log('\n🎉 All tests passed! Your database is ready to use.\n');
  process.exit(0);
}

runTests();
