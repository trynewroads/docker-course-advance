const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { uploadsDir } = require('./paths');

if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const nameWithoutExt = path.basename(file.originalname, ext);
    
    const timestamp = Date.now();
    
    const filename = `${nameWithoutExt}_${timestamp}${ext}`;
    cb(null, filename);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;