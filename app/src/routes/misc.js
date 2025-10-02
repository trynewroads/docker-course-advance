const express = require('express');
const MiscController = require('../controllers/misc');

const router = express.Router();

router.get('/', MiscController.helloWorld);
router.get('/health', MiscController.healthCheck);
router.get('/secret', MiscController.retrieveSecret);
router.get('/db-health', MiscController.dbHealthCheck);

module.exports = router;