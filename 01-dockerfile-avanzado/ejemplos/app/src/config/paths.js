const path = require('path');

const root = process.cwd();
const uploadsDir = path.join(root, 'uploads');
const logsDir = path.join(root, 'logs');

module.exports = {
  root,
  uploadsDir,
  logsDir
};
