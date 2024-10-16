const express = require('express');
const Center = require('../models/Center'); // Ensure this path is correct
const router = express.Router();

// Get all centers
router.get('/', async (req, res) => {
    try {
        const centers = await Center.find();
        res.json(centers);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch centers.' });
    }
});

module.exports = router;
