const express = require('express');
const router = express.Router();
const Marca = require('../models/Marca'); // Asegúrate de que la ruta sea correcta
const { validationResult, check } = require('express-validator');

// Crear una nueva marca - POST
router.post('/', [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').not().isEmpty(),

], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errores: errors.array() });
        }

        const existeMarca = await Marca.findOne({ nombre: req.body.nombre });
        if (existeMarca) {
            return res.status(400).json({ mensaje: 'La marca ya está registrada' });
        }

        const nuevaMarca = new Marca(req.body);
        const marcaGuardada = await nuevaMarca.save();
        res.status(201).json(marcaGuardada);
    } catch (error) {
        res.status(500).json({ mensaje: 'Ocurrió un error al crear la marca' });
    }
});

// Listar todas las marcas - GET
router.get('/', async (req, res) => {
    try {
        const marcas = await Marca.find();
        res.json(marcas);
    } catch (error) {
        res.status(500).json({ mensaje: 'Ocurrió un error al obtener las marcas' });
    }
});

module.exports = router;
