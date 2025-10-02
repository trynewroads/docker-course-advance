const userService = require('../services/users');
const logger = require('../config/logger');

class UserController {
  static async createUser(req, res) {
    try {
      const { name, email } = req.body;
      const user = await userService.createUser(name, email);
      
      res.status(201).json({
        success: true,
        data: user
      });
    } catch (error) {
      logger.error('Error creando usuario:', error.message);
      
      if (error.code === 'MISSING_FIELDS') {
        return res.status(400).json({
          success: false,
          error: error.message
        });
      }
      
      if (error.code === 'DUPLICATE_EMAIL') {
        return res.status(409).json({
          success: false,
          error: error.message
        });
      }
      
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor'
      });
    }
  }

  static async getAllUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      res.json({
        success: true,
        count: users.length,
        data: users
      });
    } catch (error) {
      logger.error('Error obteniendo usuarios:', error.message);
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor'
      });
    }
  }
}

module.exports = UserController;