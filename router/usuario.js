const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario'); 
const { validationResult, check } = require('express-validator');

// Crear un nuevo usuario
router.post('/', [

    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('email', 'invalid.email').isEmail(),
    check('estado', 'invalid.estado').isIn('Activo', 'Inactivo'),
    check('password', 'invalid.password').not().isEmpty(),
    check('rol', 'invalid.rol').isIn('Administrador', 'Docente'),

],async (req, res) => {
    
    const existeUsuario = await Usuario.findOne({ email: req.body.email});
        if (existeUsuario) {
            return res.status(400).send('Email ya existe');
        }
});


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
        console.log(error);
    }
});

module.exports = router;
