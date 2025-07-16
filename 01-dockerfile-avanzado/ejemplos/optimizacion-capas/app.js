// Ejemplo simple de aplicación Node.js
const http = require('http');

const server = http.createServer((req, res) => {
  res.end('¡Hola desde Node.js en Docker!');
});

server.listen(3000, () => {
  console.log('Servidor escuchando en puerto 3000');
});
