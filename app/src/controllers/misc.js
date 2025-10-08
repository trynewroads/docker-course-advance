const MiscService = require('../services/misc');
const env = require('../config/env');

class MiscController {
  static helloWorld(req, res) {
    const message = MiscService.getHelloMessage();
    res.json(message);
  }

  static healthCheck(req, res) {
    const healthStatus = MiscService.getHealthStatus();
    res.json(healthStatus);
  }

  static retrieveSecret(req, res) {
    const secretData = MiscService.getSecret();
    res.json(secretData);
  }

  static async dbHealthCheck(req, res) {
    try {
      const dbHealth = await MiscService.checkDatabaseHealth();
      res.json(dbHealth);
    } catch (error) {
      res.status(500).json({
        status: 'error',
        database: env.USE_DB ? 'postgresql' : 'memory',
        error: error.message,
        timestamp: new Date().toISOString()
      });
    }
  }
}

module.exports = MiscController;