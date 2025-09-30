const express = require('express');
const ensureDirs = require('./utils/ensureDirs');
const logger = require('./config/logger');
const uploadRoutes = require('./routes/uploads');
const usersRouter = require('./routes/users').router;
const ensureUsersTable = require('./db/ensureUsersTable');
const miscRoutes = require('./routes/misc');
const env = require('./config/env');
const app = express();

ensureDirs();

app.use(express.json());


app.use('/users', usersRouter);
app.use('/upload', uploadRoutes);
app.use('/', miscRoutes);

if (require.main === module) {
  ensureUsersTable().then(() => {
    app.listen(env.PORT, () => {
      logger.info(`Servidor Express escuchando en puerto ${env.PORT}`);
    });
  });
}


module.exports = app;