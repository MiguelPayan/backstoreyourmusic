// routes/users.routes.js
const express = require('express');
const router = express.Router();
const usersController = require('../controller/users.controller');

// Ruta para obtener el perfil del usuario por su ID
router.get('/profile/:id', usersController.getProfileById);

module.exports = router;


