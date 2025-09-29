// Ejemplo con Express
const express = require('express');
const fs = require('fs');
const app = express();

const PORT = process.env.PORT || 3000;

// Función para obtener el secreto desde diferentes fuentes
function getSecret() {
  // 1. Intentar leer desde archivo montado
  const secretFile = '/run/secrets/secret.txt';
  if (fs.existsSync(secretFile)) {
    try {
      return fs.readFileSync(secretFile, 'utf8').trim();
    } catch (err) {
      console.log('Error leyendo archivo de secreto:', err.message);
    }
  }

  // 2. Usar variable de entorno como fallback
  if (process.env.SECRET) {
    return process.env.SECRET;
  }

  // 3. Si no hay nada, devolver undefined
  return undefined;
}

// Obtener el secreto al arrancar la aplicación
const SECRET = getSecret();

app.get('/', (req, res) => {
  res.send('¡Hola desde Node.js en Docker!');
});

app.get('/secret', (req, res) => {  
  res.send(`Este es el secreto: ${SECRET}`);
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en puerto ${PORT}`);
    console.log(`Secreto configurado: ${SECRET !== undefined ? 'Sí' : 'No'}`);
    if (fs.existsSync('/run/secrets/secret.txt')) {
      console.log('Secreto cargado desde archivo montado');
    } else if (process.env.SECRET) {
      console.log('Secreto cargado desde variable de entorno');
    } else {
      console.log('No hay secreto configurado');
    }
  });
}


module.exports = app;