const express = require('express');
const router = express.Router();
const EstadoEquipo = require('../models/EstadoEquipo');
const { validationResult, check } = require('express-validator');

// Crear un nuevo estado de equipo - POST
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('estado', 'El estado es obligatorio').isIn(['Activo', 'Inactivo']),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errores: errors.array() });
        }

        const existeEstado = await EstadoEquipo.findOne({ nombre: req.body.nombre });
        if (existeEstado) {
            return res.status(400).json({ mensaje: 'El estado de equipo ya existe' });
        }

        let estadoEquipo = new EstadoEquipo(req.body);

        const estadoGuardado = await estadoEquipo.save();
        res.status(201).json(estadoGuardado);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al crear el estado de equipo');
    }
});

// Listar todos los estados de equipo - GET
router.get('/', async (req, res) => {
    try {
        const estados = await EstadoEquipo.find();
        res.json(estados);
    
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al listar los estados de equipo');
    }
});

module.exports = router;
