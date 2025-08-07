const { Pool } = require('pg');

const dbPool = new Pool({
  host: process.env.PGHOST || 'db',
  user: process.env.PGUSER || 'user',
  password: process.env.PGPASSWORD || 'password',
  database: process.env.PGDATABASE || 'mydb',
  port: process.env.PGPORT ? parseInt(process.env.PGPORT) : 5432,
});

module.exports = dbPool;
