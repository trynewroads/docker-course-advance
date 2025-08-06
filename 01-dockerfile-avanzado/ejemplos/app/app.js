// Ejemplo con Express

const express = require('express');
const fs = require('fs');
const winston = require('winston');
const app = express();
const { Pool } = require('pg');


// Configuración de Winston
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console()
  ]
});

const dbPool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'postgres',
});

const PORT = process.env.PORT || 3000;


// Función para obtener el secreto desde diferentes fuentes
function getSecret() {
  // 1. Intentar leer desde archivo montado
  const secretFile = '/run/secrets/secret.txt';
  if (fs.existsSync(secretFile)) {
    try {
      return fs.readFileSync(secretFile, 'utf8').trim();
    } catch (err) {
      logger.error('Error leyendo archivo de secreto: ' + err.message);
    }
  }

  // 2. Usar variable de entorno como fallback
  if (process.env.SECRET) {
    return process.env.SECRET;
  }

  // 3. Si no hay nada, devolver undefined
  return undefined;
}

// Obtener el secreto al arrancar la aplicación
const SECRET = getSecret();

app.get('/', (req, res) => {
  res.send('¡Hola desde Node.js en Docker!');
});

app.get('/healthcheck', (req, res) => {  
  res.send({status: 'ok'});
});

app.get('/secret', (req, res) => {  
  res.send(`Este es el secreto: ${SECRET}`);
});

app.get('/db-health', async (req, res) => {
  try {
    const result = await dbPool.query('SELECT NOW()');
    res.json({ status: 'ok', time: result.rows[0].now });
  } catch (err) {
    res.status(500).json({ status: 'error', error: err.message });
  }
});

if (require.main === module) {
  app.listen(PORT, () => {
    logger.info(`Servidor Express escuchando en puerto ${PORT}`);
    logger.debug(`Secreto configurado: ${SECRET !== undefined ? 'Sí' : 'No'}`);
    if (fs.existsSync('/run/secrets/secret.txt')) {
      logger.debug('Secreto cargado desde archivo montado');
    } else if (process.env.SECRET) {
      logger.debug('Secreto cargado desde variable de entorno');
    } else {
      logger.warn('No hay secreto configurado');
    }
  });
}


module.exports = app;