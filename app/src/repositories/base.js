/**
 * Interfaz base del repositorio de usuarios
 * Define los métodos que debe implementar cualquier repositorio
 */
class BaseUserRepository {
  // eslint-disable-next-line no-unused-vars
  async createUser(name, email) {
    throw new Error('Method createUser must be implemented');
  }

  async getAllUsers() {
    throw new Error('Method getAllUsers must be implemented');
  }

  async ensureTable() {
    throw new Error('Method ensureTable must be implemented');
  }
}

module.exports = BaseUserRepository;