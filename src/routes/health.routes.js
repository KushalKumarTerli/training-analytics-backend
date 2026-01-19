const express = require('express');

const router = express.Router(); 

// Health check endpoint
router.get('/', (req, res) => {
    res.json({ statusCode : res.statusCode, status: 'OK', message: 'Server is healthy' });
})

module.exports = router;