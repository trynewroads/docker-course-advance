const multer = require('multer');
const fs = require('fs');

const { uploadsDir } = require('./paths');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

const upload = multer({ dest: uploadsDir });

module.exports = upload;
