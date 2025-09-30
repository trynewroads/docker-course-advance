const express = require('express');
const dbPool = require('../db/pool');
const getSecret = require('../utils/getSecret');

const router = express.Router();
const SECRET = getSecret();

router.get('/', (req, res) => {
  res.send('¡Hola desde Node.js en Docker!');
});

router.get('/healthcheck', (req, res) => {
  res.send({ status: 'ok' });
});

router.get('/secret', (req, res) => {
  res.send(`Este es el secreto: ${SECRET}`);
});

router.get('/db-health', async (req, res) => {
  try {
    const result = await dbPool.query('SELECT NOW()');
    res.json({ status: 'ok', time: result.rows[0].now });
  } catch (err) {
    res.status(500).json({ status: 'error', error: err.message });
  }
});

module.exports = router;
