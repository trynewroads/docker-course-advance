// app.js
// Aplicación de ejemplo para ejercicios de Docker avanzado

const http = require('http');

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const DB_PASSWORD = process.env.DB_PASSWORD;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    mensaje: '¡Hola desde Docker!',
    entorno: NODE_ENV,
    puerto: PORT,
    secreto: DB_PASSWORD ? '***' : '(no definido)',
    pista: 'El secreto real nunca debe mostrarse en producción.'
  }));
});

server.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT} (entorno: ${NODE_ENV})`);
});
