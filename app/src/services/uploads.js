const path = require('path');
const fs = require('fs');
const logger = require('../config/logger');
const { uploadsDir } = require('../config/paths');


class UploadService {
  static getAllFiles() {
    try {
      if (!fs.existsSync(uploadsDir)) {
        return [];
      }
      
      const files = fs.readdirSync(uploadsDir);
      const fileList = files.map(filename => {
        const filePath = path.join(uploadsDir, filename);
        const stats = fs.statSync(filePath);
        return {
          filename,
          size: stats.size,
          uploadDate: stats.mtime,
          url: `/uploads/${filename}`
        };
      });
      
      logger.info(`Retrieved ${fileList.length} files`);
      return fileList;
    } catch (error) {
      logger.error('Error retrieving files:', error);
      throw new Error('Error al obtener la lista de archivos');
    }
  }

  static getFileByName(filename) {
    const filePath = path.join(uploadsDir, filename);
    if (!fs.existsSync(filePath)) {
      throw new Error('Archivo no encontrado');
    }
    return filePath;
  }

  static saveFile(file) {
    if (!file) {
      throw new Error('No file uploaded');
    }
    
    logger.info(`File uploaded: ${file.originalname} -> ${file.filename}`);
    
    return {
      filename: file.filename,
      originalname: file.originalname,
      message: 'File uploaded successfully'
    };
  }
}

module.exports = UploadService;