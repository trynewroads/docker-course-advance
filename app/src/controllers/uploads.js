const UploadService = require('../services/uploads');

class UploadController {
  static async getAllFiles(req, res) {
    try {
      const files = UploadService.getAllFiles();
      res.json(files);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getFile(req, res) {
    try {
      const filePath = UploadService.getFileByName(req.params.filename);
      res.sendFile(filePath);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  static async uploadFile(req, res) {
    try {
      const result = UploadService.saveFile(req.file);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = UploadController;