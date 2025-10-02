const express = require('express');
const upload = require('../config/multer');
const UploadController = require('../controllers/uploads');

const router = express.Router();

router.post('/', upload.single('file'), UploadController.uploadFile);
router.get('/', UploadController.getAllFiles);
router.get('/:filename', UploadController.getFile);

module.exports = router;