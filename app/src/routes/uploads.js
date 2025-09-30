const express = require('express');
const path = require('path');
const fs = require('fs');
const upload = require('../config/multer');
const logger = require('../config/logger');

const router = express.Router();
const uploadsDir = path.join(__dirname, '../uploads');


router.post('/', upload.single('file'), uploadFile);
router.get('/:filename', getFile);

function getFile(req, res) {
  const filePath = path.join(uploadsDir, req.params.filename);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ error: 'Archivo no encontrado' });
  }
}

function uploadFile(req, res) {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  logger.info(`File uploaded: ${req.file.originalname} -> ${req.file.filename}`);
  res.status(201).json({ filename: req.file.filename, originalname: req.file.originalname }); 

}


module.exports = router;
