const dbPool = require('./pool');
const logger = require('../config/logger');

async function ensureUsersTable() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL
    );
  `;
  try {
    await dbPool.query(createTableQuery);
    logger.info('Tabla de usuarios verificada/creada');
  } catch (err) {
    logger.error('Error creando/verificando tabla de usuarios: ' + err.message);
  }
}

module.exports = ensureUsersTable;
