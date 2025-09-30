const env = require('../config/env');
const MemoryUserRepository = require('./memoryUserRepository');
const PgUserRepository = require('./pgUserRepository');
const logger = require('../config/logger');

class UserRepositoryFactory {
  static createRepository() {
    if (env.USE_DB) {
      logger.info('Creando repositorio de usuarios PostgreSQL');
      return new PgUserRepository();
    } else {
      logger.info('Creando repositorio de usuarios en memoria');
      return new MemoryUserRepository();
    }
  }
}

module.exports = UserRepositoryFactory;