const { Pool } = require('pg');
const env = require('../config/env');

const dbPool = new Pool({
  host: env.DB_HOST,
  user: env.DB_USER,
  password: env.DB_PASS,
  database: env.DB_NAME,
  port: env.DB_PORT
});

module.exports = dbPool;
