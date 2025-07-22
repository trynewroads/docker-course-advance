console.log('Variables de entorno:');
console.log('APP_ENV:', process.env.APP_ENV);
console.log('DEBUG:', process.env.DEBUG);
console.log('API_URL:', process.env.API_URL);

// Si quieres funcionalidad extra, por ejemplo un servidor HTTP:
if (process.env.START_SERVER === 'true') {
  const http = require('http');
  const port = process.env.PORT || 3000;
  http.createServer((req, res) => {
    res.end(`Entorno: ${process.env.APP_ENV}, Debug: ${process.env.DEBUG}, API_URL: ${process.env.API_URL}`);
  }).listen(port, () => {
    console.log(`Servidor escuchando en puerto ${port}`);
  });
}
