const env = require('../config/env');
const getSecret = require('../utils/getSecret');
const logger = require('../config/logger');
const os = require('os');

class MiscService {
  static getHelloMessage() {    
    return {
      node_version: process.version,
      platform: process.platform,
      arch: process.arch,
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      hostname: os.hostname(),
      timestamp: new Date().toISOString()
    };
  }

  static getHealthStatus() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: env.NODE_ENV,
      database: env.USE_DB ? 'PostgreSQL' : 'Memory'
    };
  }

  static getSecret() {
    const secret = getSecret();
    return {
      secret: secret,
      timestamp: new Date().toISOString()
    };
  }

  static async checkDatabaseHealth() {
    try {
      if (!env.USE_DB) {
        return {
          status: 'ok',
          database: 'memory',
          message: 'Base de datos en memoria funcionando',
          timestamp: new Date().toISOString()
        };
      }

      const { Pool } = require('pg');
      const pool = new Pool({
        host: env.DB_HOST,
        port: env.DB_PORT,
        database: env.DB_NAME,
        user: env.DB_USER,
        password: env.DB_PASS,
        max: 1,
        connectionTimeoutMillis: 5000
      });

      const result = await pool.query('SELECT NOW() as current_time, version() as pg_version');
      await pool.end();

      return {
        status: 'ok',
        database: 'postgresql',
        current_time: result.rows[0].current_time,
        pg_version: result.rows[0].pg_version,
        connection: {
          host: env.DB_HOST,
          port: env.DB_PORT,
          database: env.DB_NAME
        }
      };

    } catch (error) {
      logger.error('Error en DB health check:', error);
      throw new Error(error);
    }
  }
}

module.exports = MiscService;