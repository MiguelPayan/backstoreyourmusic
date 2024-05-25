// controller/users.controller.js
const mongoose = require('mongoose');
const User = require('../models/usuarios.model'); 

const usersController = {};

usersController.getProfileById = async (req, res) => {
    const userId = req.params.id;
    console.log(`Accediendo al perfil del usuario con ID: ${userId}`);
    
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).send('ID de usuario no válido');
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('Usuario no encontrado');
        }
        res.render('profile', { user });
    } catch (err) {
        console.error(`Error al obtener el perfil del usuario: ${err.message}`);
        res.status(500).send(`Error del servidor: ${err.message}`);
    }
};

module.exports = usersController;
