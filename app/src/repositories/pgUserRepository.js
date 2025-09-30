const { Pool } = require('pg');
const BaseUserRepository = require('./base');
const env = require('../config/env');
const logger = require('../config/logger');

class PgUserRepository extends BaseUserRepository {
  constructor() {
    super();
    this.pool = new Pool({
      host: env.DB_HOST,
      port: env.DB_PORT,
      database: env.DB_NAME,
      user: env.DB_USER,
      password: env.DB_PASS,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000
    });
  }

  async ensureTable() {
    try {
      logger.info('Conectando a PostgreSQL...');
      
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          email VARCHAR(100) UNIQUE NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `;
      
      await this.pool.query(createTableQuery);
      logger.info('Tabla users verificada/creada en PostgreSQL');
    } catch (error) {
      logger.error('Error conectando a PostgreSQL:', error.message);
      throw error;
    }
  }

  async createUser(name, email) {
    const query = 'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *';
    const values = [name, email];
    
    try {
      const result = await this.pool.query(query, values);
      const user = result.rows[0];
      logger.debug(`Usuario creado en PostgreSQL: ${JSON.stringify(user)}`);
      return user;
    } catch (error) {
      logger.error('Error creando usuario:', error.message);
      
      if (error.code === '23505') {
        const duplicateError = new Error('El email ya existe');
        duplicateError.code = 'DUPLICATE_EMAIL';
        throw duplicateError;
      }
      
      throw error;
    }
  }

  async getAllUsers() {
    try {
      const result = await this.pool.query('SELECT * FROM users ORDER BY id');
      logger.debug(`Obteniendo ${result.rows.length} usuarios de PostgreSQL`);
      return result.rows;
    } catch (error) {
      logger.error('Error obteniendo usuarios:', error.message);
      throw error;
    }
  }

  async close() {
    await this.pool.end();
    logger.info('Conexión a PostgreSQL cerrada');
  }
}

module.exports = PgUserRepository;