const express = require('express');
const router = express.Router();
const { pool } = require('../config/database-postgres');

// POST: Submit contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, company, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required fields.'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.'
      });
    }

    // Insert into database
    const query = `
      INSERT INTO contact_messages (name, email, company, message)
      VALUES ($1, $2, $3, $4)
      RETURNING id
    `;
    
    const result = await pool.query(query, [
      name.trim(),
      email.trim(),
      company ? company.trim() : null,
      message.trim()
    ]);

    // Success response
    res.status(201).json({
      success: true,
      message: 'Thank you for your message! We will get back to you soon.',
      data: {
        id: result.rows[0].id,
        name,
        email
      }
    });

  } catch (error) {
    console.error('Error saving contact message:', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.'
    });
  }
});

// GET: Retrieve all contact messages (for admin use)
router.get('/', async (req, res) => {
  try {
    const query = `
      SELECT id, name, email, company, message, created_at
      FROM contact_messages
      ORDER BY created_at DESC
    `;
    
    const result = await pool.query(query);

    res.status(200).json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });

  } catch (error) {
    console.error('Error fetching contact messages:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching messages.'
    });
  }
});

// GET: Retrieve single contact message by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
      SELECT id, name, email, company, message, created_at
      FROM contact_messages
      WHERE id = $1
    `;
    
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Message not found.'
      });
    }

    res.status(200).json({
      success: true,
      data: result.rows[0]
    });

  } catch (error) {
    console.error('Error fetching contact message:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching message.'
    });
  }
});

module.exports = router;
