const express = require('express');
const dbPool = require('../db/pool');
const getSecret = require('../utils/getSecret');

const router = express.Router();
const SECRET = getSecret();

router.get('/', helloWorld);
router.get('/health', healthCheck);
router.get('/secret', retrieveSecret);
router.get('/db-health', dbHealthCheck);

function helloWorld(req, res) {
    res.send('¡Hola desde Node.js en Docker!');
}

function healthCheck(req, res) {
  res.send({ status: 'ok' });
}

function retrieveSecret(req,res) {
  res.send(`Este es el secreto: ${SECRET}`);
}

async function dbHealthCheck(req, res) {
  try {
      const result = await dbPool.query('SELECT NOW()');
      res.json({ status: 'ok', time: result.rows[0].now });
    } catch (err) {
      res.status(500).json({ status: 'error', error: err.message });
    }
}

module.exports = router;
