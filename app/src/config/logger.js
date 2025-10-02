const winston = require('winston');
const path = require('path');
const fs = require('fs');
const os = require('os');
const env = require('../config/env');
const { logsDir } = require('./paths');
if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir);

const logger = winston.createLogger({
  level: env.DEBUG_LEVEL,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.colorize(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}][${os.hostname()}][${level}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: path.join(logsDir, 'app.log') })
  ]
});

module.exports = logger;
