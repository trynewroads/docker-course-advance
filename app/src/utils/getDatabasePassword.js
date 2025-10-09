const fs = require('fs');
const logger = require('../config/logger');

function getDatabasePassword() {
  let password = undefined;
  const secretFile = '/run/secrets/db_password';
  if (fs.existsSync(secretFile)) {
    try {
      password = fs.readFileSync(secretFile, 'utf8').trim();
    } catch (err) {
      logger.error('Error leyendo archivo de secreto: ' + err.message);
    }
  }
  
  if (process.env.DB_PASS) {
    password = process.env.DB_PASS;
  }

  logger.debug(`Database password ${password}`);

  return password;
}

module.exports = getDatabasePassword;