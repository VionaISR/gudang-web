const express = require('express');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const port = 3000;

// Koneksi ke database Postgres
const pool = new Pool({
  host: 'db',
  user: 'mesin_db',
  password: 'P@sww0rd',
  database: 'gudang_db',
  port: 5432
});

// Setup EJS & static file (CSS, Images)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '..', 'public')));

// Route tampilan utama + search
app.get('/', async (req, res) => {
  try {
    const keyword = req.query.q || '';
    let barang;

    if (keyword) {
      const result = await pool.query(
        `SELECT * FROM barang WHERE nama ILIKE $1 OR brand ILIKE $1`,
        [`%${keyword}%`]
      );
      barang = result.rows;
    } else {
      const result = await pool.query('SELECT * FROM barang');
      barang = result.rows;
    }

    // Ganti spasi di nama gambar jadi _
    barang.forEach(item => {
      if (item.gambar) {
        item.gambar = item.gambar.replace(/\s+/g, '_');
      }
    });

    res.render('index', { barang, keyword });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).send('Database error');
  }
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server jalan di port ${port}`);
});
