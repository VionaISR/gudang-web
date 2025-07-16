const express = require('express');
const router = express.Router();
const pool = require('./db');

router.get('/search', async (req, res) => {
  const keyword = req.query.q || '';
  try {
    const result = await pool.query(
      `SELECT * FROM barang WHERE nama ILIKE $1 OR kode ILIKE $1`,
      [`%${keyword}%`]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
