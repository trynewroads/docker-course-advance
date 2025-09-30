const fs = require('fs');
const logger = require('../config/logger');

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

module.exports = getSecret;
