const express = require('express');
const env = require('../config/env');
const getSecret = require('../utils/getSecret');
const logger = require('../config/logger');

const router = express.Router();
const SECRET = getSecret();

router.get('/', helloWorld);
router.get('/health', healthCheck);
router.get('/secret', retrieveSecret);
router.get('/db-health', dbHealthCheck);

function helloWorld(req, res) {
  res.send('¡Hola desde Node.js en Docker!');
}

function healthCheck(req, res) {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: env.NODE_ENV,
    database: env.USE_DB ? 'PostgreSQL' : 'Memory'
  });
}

function retrieveSecret(req, res) {
  res.json({ 
    secret: SECRET,
    timestamp: new Date().toISOString()
  });
}

async function dbHealthCheck(req, res) {
  try {
    if (!env.USE_DB) {
      // Si usa base de datos en memoria
      return res.json({ 
        status: 'ok', 
        database: 'memory',
        message: 'Base de datos en memoria funcionando',
        timestamp: new Date().toISOString()
      });
    }

    
    const { Pool } = require('pg');
    const pool = new Pool({
      host: env.DB_HOST,
      port: env.DB_PORT,
      database: env.DB_NAME,
      user: env.DB_USER,
      password: env.DB_PASS,
      max: 1, // Solo una conexión para el health check
      connectionTimeoutMillis: 5000
    });

    const result = await pool.query('SELECT NOW() as current_time, version() as pg_version');
    await pool.end(); // Cerrar la conexión temporal

    res.json({ 
      status: 'ok', 
      database: 'postgresql',
      current_time: result.rows[0].current_time,
      pg_version: result.rows[0].pg_version,
      connection: {
        host: env.DB_HOST,
        port: env.DB_PORT,
        database: env.DB_NAME
      }
    });

  } catch (error) {
    logger.error('Error en DB health check:', error.message);
    res.status(500).json({ 
      status: 'error', 
      database: env.USE_DB ? 'postgresql' : 'memory',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
}

module.exports = router;