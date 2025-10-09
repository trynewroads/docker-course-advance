const fs = require('fs');
const logger = require('../config/logger');

function getDatabasePassword() {

  const secretFile = '/run/secrets/db_password.txt';
  if (fs.existsSync(secretFile)) {
    try {
      return fs.readFileSync(secretFile, 'utf8').trim();
    } catch (err) {
      logger.error('Error leyendo archivo de secreto: ' + err.message);
    }
  }
  
  if (process.env.DB_PASS) {
    return process.env.DB_PASS;
  }
  
  return undefined;
}

module.exports = getDatabasePassword;