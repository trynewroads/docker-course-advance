const UserRepositoryFactory = require('../repositories/userRepositoryFactory');
const logger = require('../config/logger');

class UserService {
  constructor() {
    this.repository = UserRepositoryFactory.createRepository();
  }

  async createUser(name, email) {
    if (!name || !email) {
      const error = new Error('Faltan campos requeridos: name y email');
      error.code = 'MISSING_FIELDS';
      throw error;
    }

    try {
      return await this.repository.createUser(name, email);
    } catch (error) {
      logger.error('Error en servicio createUser:', error.message);
      throw error;
    }
  }

  async getAllUsers() {
    try {
      return await this.repository.getAllUsers();
    } catch (error) {
      logger.error('Error en servicio getAllUsers:', error.message);
      throw error;
    }
  }

  async ensureTable() {
    try {
      return await this.repository.ensureTable();
    } catch (error) {
      logger.error('Error en servicio ensureTable:', error.message);
      throw error;
    }
  }
}

const userService = new UserService();
module.exports = userService;