const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario'); 

// Listar todos los usuarios
router.get('/', async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.send(usuarios);
    
    } catch (error) {
        console.log(error);
    }
});

// Actualizar un usuario
router.put('/:id', async (req, res) => {
    try {
        const usuarioActualizado = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(usuarioActualizado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
