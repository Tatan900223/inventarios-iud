const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const { validationResult, check } = require('express-validator');
const bcrypt = require('bcryptjs');
const { validarJWT } = require('../middleware/validar-jwt');

// Crear un nuevo usuario - POST
router.post('/',[validarJWT], [

    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('email', 'invalid.email').isEmail(),
    check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo']),
    check('password', 'invalid.password').not().isEmpty(),
    check('rol', 'invalid.rol').isIn(['Administrador', 'Docente']),

], async (req, res) => {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty())
        return res.status(400).json({ mensaje: errors.array() });

        const existeUsuario = await Usuario.findOne({ email: req.body.email });
        if (existeUsuario) {
            return res.status(400).send('Email ya existe');
        }

        let usuario = new Usuario();
        usuario.nombre = req.body.nombre;
        usuario.email = req.body.email;
        usuario.estado = req.body.estado;

        const salt = bcrypt.genSaltSync();
        const password = bcrypt.hashSync(req.body.password, salt);
        usuario.password = password;
        
        usuario.rol = req.body.rol;
        usuario.fechaCreacion = new Date();
        usuario.fechaActualizacion = new Date();

        usuario = await usuario.save()
        res.send(usuario);


    } catch (error) {
        console.log(error);
        res.status(500).send('ocurrió un error al crear el usuario')
    }

});


// Listar todos los usuarios
router.get('/',[validarJWT], async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.send(usuarios);
    
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
