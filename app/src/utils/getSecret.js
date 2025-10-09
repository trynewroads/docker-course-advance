const fs = require('fs');
const logger = require('../config/logger');

function getSecret() {
  
  const secretFile = '/run/secrets/secret';
  if (fs.existsSync(secretFile)) {
    try {
      return fs.readFileSync(secretFile, 'utf8').trim();
    } catch (err) {
      logger.error('Error leyendo archivo de secreto: ' + err.message);
    }
  }
  
  if (process.env.SECRET) {
    return process.env.SECRET;
  }
  
  return undefined;
}


module.exports = getSecret;
