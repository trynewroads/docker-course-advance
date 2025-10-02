const express = require('express');
const UserController = require('../controllers/users');

const router = express.Router();

router.post('/', UserController.createUser);
router.get('/', UserController.getAllUsers);

module.exports = { router };