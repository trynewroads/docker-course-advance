const fs = require('fs');
const logger = require('../config/logger');

function getSecret() {
  readFileSecret();
  readEnvSecret()
  return undefined;
}

function readFileSecret(){
  const secretFile = '/run/secrets/secret.txt';
  if (fs.existsSync(secretFile)) {
    try {
      return fs.readFileSync(secretFile, 'utf8').trim();
    } catch (err) {
      logger.error('Error leyendo archivo de secreto: ' + err.message);
    }
  }
}

function readEnvSecret() {
  if (process.env.SECRET) {
    return process.env.SECRET;
  }
}

module.exports = getSecret;
