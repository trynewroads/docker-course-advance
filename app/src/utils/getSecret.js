const fs = require('fs');
const logger = require('../config/logger');

function getSecret() {
  let secret = undefined;
  const secretFile = '/run/secrets/secret';
  if (fs.existsSync(secretFile)) {
    try {
      secret = fs.readFileSync(secretFile, 'utf8').trim();
    } catch (err) {
      logger.error('Error leyendo archivo de secreto: ' + err.message);
    }
  }
  
  if (process.env.SECRET) {
    secret = process.env.SECRET;
  }

  logger.debug(`App secret ${secret}`);

  return secret;
}

module.exports = getSecret;
