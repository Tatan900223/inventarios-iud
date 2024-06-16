const { Schema, model } = require('mongoose');

const InventarioSchema = new Schema({
    serial: { type: String, required: true, unique: true },
    modelo: { type: String, required: true },
    descripcion: { type: String },
    foto: { type: String, required: true }, // Asumiendo que se guarda la URL de la imagen
    color: { type: String, required: true },
    fechaCompra: { type: Date, required: true },
    precio: { type: Number, required: true },
    usuario: { 
        type : Schema.Types.ObjectId,
        ref : 'Usuario',
        required : false
    },
    marca: {
        type : Schema.Types.ObjectId,
        ref : 'Marca',
        required : true
    },
    estadoEquipo: {
        type : Schema.Types.ObjectId,
        ref : 'EstadoEquipo',
        required : true
    },
    tipoEquipo: {
        type : Schema.Types.ObjectId,
        ref : 'TipoEquipo',
        required : true
    },
    fechaCreacion: { type: Date, default: Date.now },
    fechaActualizacion: { type: Date, default: Date.now }
});

module.exports = model('Inventario', InventarioSchema);
 