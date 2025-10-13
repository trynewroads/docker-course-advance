const logger = require('../logger');

function requestLogger(req, res, next) {
  logger.info(`Incoming request: ${req.method} ${req.originalUrl} - IP: ${req.ip}`);
  next();
}

module.exports = requestLogger;
