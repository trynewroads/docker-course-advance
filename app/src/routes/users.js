const express = require('express');
const dbPool = require('../db/pool');
const logger = require('../config/logger');

const router = express.Router();

router.post('/', createUser);
router.get('/', getUsers);

async function createUser(req, res) {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Faltan campos requeridos: name y email' });
  }
  try {
    const result = await dbPool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    logger.error('Error insertando usuario: ' + err.message);
    if (err.code === '23505') {
      res.status(409).json({ error: 'El email ya existe' });
    } else {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
}

async function getUsers(req, res) {
  try {
    const result = await dbPool.query('SELECT id, name, email FROM users ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    logger.error('Error listando usuarios: ' + err.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}



module.exports = { router };
