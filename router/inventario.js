const express = require('express');
const router = express.Router();
const Inventario = require('../models/Inventario');
const { validationResult, check } = require('express-validator');
const bcrypt = require('bcryptjs');

// Crear un nuevo inventario - POST
router.post('/', [

    check('serial', 'invalid.serial').not().isEmpty(),
    check('modelo', 'invalid.modelo').not().isEmpty(),
    check('descripcion', 'invalid.descripcion').not().isEmpty(),
    check('foto', 'invalid.foto').not().isEmpty(),
    check('color', 'invalid.color').not().isEmpty(),
    check('fechaCompra', 'invalid.fechaCompra').not().isEmpty(),
    check('precio', 'invalid.precio').not().isEmpty(),
    check('usuario', 'invalid.usuario').not().isEmpty(),
    check('marca', 'invalid.marca').not().isEmpty(),
    check('estadoEquipo', 'invalid.estadoEquipo').not().isEmpty(),
    check('tipoEquipo', 'invalid.tipoEquipo').not().isEmpty(),
   

], async (req, res) => {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty())
        return res.status(400).json({ mensaje: errors.array() });

        const existeinventarioPorSerial = await Inventario.findOne({ serial: req.body.serial });
        if (existeinventarioPorSerial) {
            return res.status(400).send('Ya existe el serial para otro equipo');
        }

        let inventario = new Inventario();
        inventario.serial = req.body.serial
        inventario.modelo = req.body.modelo
        inventario.descripcion = req.body.descripcion
        inventario.foto = req.body.foto
        inventario.color = req.body.color
        inventario.fechaCompra = req.body.fechaCompra
        inventario.precio = req.body.precio
        inventario.usuario = req.body.usuario
        inventario.marca = req.body.marca
        inventario.estadoEquipo = req.body.estadoEquipo
        inventario.tipoEquipo = req.body.tipoEquipo
        inventario.fechaCreacion = new Date();
        inventario.fechaActualizacion = new Date();

        inventario = await inventario.save()
        res.send(inventario);


    } catch (error) {
        console.log(error);
        res.status(500).send('ocurrió un error al crear el inventario')
    }

});


// Listar todos los inventarios
router.get('/', async (req, res) => {
    try {
        const inventarios = await inventario.find();
        res.send(inventarios);
    
    } catch (error) {
        console.log(error);
        res.status(500).send('ocurrió un error al listar el inventario')

    }
});

module.exports = router;
