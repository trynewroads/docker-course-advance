const express = require('express');
const env = require('./config/env'); 
const ensureDirs = require('./utils/ensureDirs');
const logger = require('./config/logger');
const uploadRoutes = require('./routes/uploads');
const usersRouter = require('./routes/users').router;
const userService = require('./services/users'); 
const miscRoutes = require('./routes/misc');
const requestLogger = require('./config/request/interceptors');

const app = express();

ensureDirs();

app.use(express.json());
app.use(requestLogger);

app.use('/users', usersRouter);
app.use('/upload', uploadRoutes);
app.use('/', miscRoutes);

if (require.main === module) {
  
  userService.ensureTable().then(() => {
    app.listen(env.PORT, () => {
      logger.info(`Servidor Express escuchando en puerto ${env.PORT}`);
      logger.info(`Entorno: ${env.NODE_ENV}`);
      logger.info(`Base de datos: ${env.USE_DB ? 'PostgreSQL' : 'En memoria'}`);
    });
  }).catch((error) => {
    logger.error('Error inicializando base de datos:', error);
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  });
}

module.exports = app;