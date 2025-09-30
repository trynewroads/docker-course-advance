const express = require('express');
const path = require('path');
const fs = require('fs');
const upload = require('../config/multer');
const logger = require('../config/logger');

const router = express.Router();
const uploadsDir = path.join(__dirname, '../uploads');

// Endpoint para subir archivos
router.post('/', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No se ha subido ningún archivo' });
  }
  logger.info(`Archivo subido: ${req.file.originalname} -> ${req.file.filename}`);
  res.status(201).json({ filename: req.file.filename, originalname: req.file.originalname });
});

// Endpoint para servir archivos subidos
router.get('/:filename', (req, res) => {
  const filePath = path.join(uploadsDir, req.params.filename);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ error: 'Archivo no encontrado' });
  }
});

module.exports = router;
