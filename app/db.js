const { Pool } = require('pg');

const pool = new Pool({
  user: 'mesin_db',
  host: 'db',
  database: 'gudang_db',
  password: 'P@sww0rd',
  port: 5432
});

module.exports = pool;
