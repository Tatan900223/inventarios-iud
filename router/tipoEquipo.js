const express = require('express');
const router = express.Router();
const TipoEquipo = require('../models/TipoEquipo');
const { validationResult, check } = require('express-validator');

// Crear un nuevo tipo de equipo - POST
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('estado', 'El estado es obligatorio').isIn(['Activo', 'Inactivo']),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errores: errors.array() });
        }

        const existeTipo = await TipoEquipo.findOne({ nombre: req.body.nombre });
        if (existeTipo) {
            return res.status(400).json({ mensaje: 'El tipo de equipo ya existe' });
        }

        let tipoEquipo = new TipoEquipo(req.body);

        const tipoGuardado = await tipoEquipo.save();
        res.status(201).json(tipoGuardado);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al crear el tipo de equipo');
    }
});

// Listar todos los tipos de equipo - GET
router.get('/', async (req, res) => {
    try {
        const tipos = await TipoEquipo.find();
        res.json(tipos);
    
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al listar los tipos de equipo');
    }
});

module.exports = router;