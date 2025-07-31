// Ejemplo con Express
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('¡Hola desde Node.js en Docker!');
});

app.get('/secret', (req, res) => {
  res.send(`Este es el secreto ${process.env.SECRET}`);
});

if (require.main === module) {
  app.listen(3000, () => {
    console.log('Servidor Express escuchando en puerto 3000');
  });
}


module.exports = app;