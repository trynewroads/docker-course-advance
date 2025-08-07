const express = require('express');
const ensureDirs = require('./utils/ensureDirs');
const logger = require('./config/logger');
const uploadRoutes = require('./routes/uploads');
const usersRouter = require('./routes/users').router;
const ensureUsersTable = require('./db/ensureUsersTable');
const miscRoutes = require('./routes/misc');

const app = express();

// Crear carpetas necesarias
ensureDirs();

const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/users', usersRouter);
app.use('/upload', uploadRoutes);
app.use('/', miscRoutes);

if (require.main === module) {
  ensureUsersTable().then(() => {
    app.listen(PORT, () => {
      logger.info(`Servidor Express escuchando en puerto ${PORT}`);
    });
  });
}


module.exports = app;