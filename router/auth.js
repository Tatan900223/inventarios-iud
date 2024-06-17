const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const { validationResult, check } = require('express-validator');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


// Crear un nuevo usuario - POST
router.post('/', [

    check('email', 'invalid.email').isEmail(),
    check('password', 'invalid.password').not().isEmpty(),

], async (req, res) => {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty())
        return res.status(400).json({ mensaje: errors.array() });

        const usuario = await Usuario.findOne({ email: req.body.email });
        if (!usuario) {
            return res.status(400).json({ mensaje:'User not Found'});
        }

        const esIgual = bcrypt.compareSync(req.body.password, usuario.password);
            if (!esIgual) {
                return res.status(400).json({ mensaje:'User not Found'});
            }
            //Generar TOKEN de AUTH
            const token = generarJWT(usuario);


            res.json({
                _id: usuario._id, nombre: usuario.nombre,
                rol: usuario.rol, email: usuario.email, access_token: token
            })

    } catch (error) {
        console.log(error);
        res.status(500).send('ocurrió un error al crear el usuario')
    }

});

module.exports = router;
