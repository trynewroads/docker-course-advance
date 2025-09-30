const fs = require('fs');
const { uploadsDir, logsDir } = require('../config/paths');

function ensureDirs() {
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);
  if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir);
}

module.exports = ensureDirs;
