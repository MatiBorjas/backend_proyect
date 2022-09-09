const { optionsMDB } = require("./options/configMDB.js");
const knexMariaDB = require("knex")(optionsMDB);
const { optionsSQLite } = require("./options/configSQLiteDB.js");
const knexSQLite = require("knex")(optionsSQLite);

let crearTablaProductos = () => {
  knexMariaDB.schema
    .hasTable('productos')
    .then(function(exists){
      if(!exists) {
        return knexMariaDB.schema.createTable('productos', (table) => {
          table.increments('id_productos');
          table.string('nombre');
          table.integer('duracion');
          table.integer('frecuencia');
          table.integer('precio');
          table.string('thumbnail');
        })
      } else {
      }
    })
    .catch((err) => console.log(err))
}

let crearTablaMensajes = () => {
  knexSQLite.schema
    .hasTable('chats')
    .then(function(exists){
      if(!exists) {
        return knexSQLite.schema.createTable('chats', (table) => {
          table.increments('id_msg');
          table.string('correo');
          table.integer('mensaje');
          table.integer('date');
        })
      } else {
      }
    })
    .then(() => {})
    .catch((err) => console.log(err))
}

module.exports = { crearTablaProductos , crearTablaMensajes };