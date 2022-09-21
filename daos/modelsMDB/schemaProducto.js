const mongoose = require('mongoose')

const schemaProducto = new mongoose.Schema({
    nombre: {type: String, require: true},
    descripcion: {type: String, require: true},
    duracion: {type: Number, require: true},
    frecuencia: {type: Number, require: true},
    precio: {type: Number, require: true},
    thumbnail: {type: String, require: true},
    stock: {type: Number, require: true},
    idP: {type: Number, require: true},
    idC: {type: Number, require: false},
    time: {type: String, require: false}
})

module.exports = mongoose.model('productos', schemaProducto)