const BaseUserRepository = require('./base');
const logger = require('../config/logger');

class MemoryUserRepository extends BaseUserRepository {
  constructor() {
    super();
    this.users = [];
    this.nextId = 1;
  }

  async ensureTable() {
    logger.info('Inicializando repositorio de usuarios en memoria');
    return Promise.resolve();
  }

  async createUser(name, email) {
    
    const existingUser = this.users.find(u => u.email === email);
    if (existingUser) {
      const error = new Error('El email ya existe');
      error.code = 'DUPLICATE_EMAIL';
      throw error;
    }

    const user = {
      id: this.nextId++,
      name,
      email,
      created_at: new Date().toISOString()
    };
    
    this.users.push(user);
    logger.debug(`Usuario creado en memoria: ${JSON.stringify(user)}`);
    return user;
  }

  async getAllUsers() {
    logger.debug(`Obteniendo ${this.users.length} usuarios de memoria`);
    return [...this.users].sort((a, b) => a.id - b.id);
  }

  
  clearAllUsers() {
    this.users = [];
    this.nextId = 1;
    logger.debug('Repositorio de memoria limpiado');
  }
}

module.exports = MemoryUserRepository;