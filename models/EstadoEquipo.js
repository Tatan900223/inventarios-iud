const { Schema, model } = require('mongoose');

const EstadoEquipoSchema = new Schema({
    nombre: { type: String, required:true},
    estado:{type:String ,required:true ,enum:['Activo','Inactivo']},
    fechaCreacion:{type:String,default:new Date()},
    fechaActualizacion:{type:String,default:new Date()}
});

module.exports=model('EstadoEquipo',EstadoEquipoSchema);
