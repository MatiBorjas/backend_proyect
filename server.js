// const fs = require('fs')

//---------------------------------------------------------------------
//        EXPRESS
//---------------------------------------------------------------------
const express = require("express");
const { Router } = express

const app = express();
const router = Router()
const PORT = process.env.PORT || 8080;

//---------------------------------------------------------------------
//        Implementacion Websockets.Io
//---------------------------------------------------------------------
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);
httpServer.listen(PORT, () => console.log("SERVER ON"));

//---------------------------------------------------------------------
//        MIDDLEWARE
//---------------------------------------------------------------------
  //Para lectura de JSon desde el server
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
  //Configuracion path del router
app.use('/api/productos', router)
app.use('/public', express.static(__dirname + '/public'));


//---------------------------------------------------------------------
//        Motor EJS
//---------------------------------------------------------------------
app.set('view engine', 'ejs');

//---------------------------------------------------------------------
//            CLASES
//---------------------------------------------------------------------
const ContenedorKnex = require('./claseKnex.js')

const { optionsMDB } = require("./options/configMDB.js");
const knexMariaDB = require("knex")(optionsMDB);
const productos = new ContenedorKnex(knexMariaDB, 'productos');

const { optionsSQLite } = require("./options/configSQLiteDB.js");
const knexSQLite = require("knex")(optionsSQLite);
const chats = new ContenedorKnex(knexSQLite, 'chats');

//---------------------------------------------------------------------
//            INICIO DE TABLAS
//---------------------------------------------------------------------
const { crearTablaProductos , crearTablaMensajes } = require('./dbCreator.js')


//---------------------------------------------------------------------
//        PETICIONES A /
//---------------------------------------------------------------------
app.get("/", (req, res) => {
  res.send({ mensaje: "Bienvenidos a Hipercompumundo mega red" });
});


//---------------------------------------------------------------------
//        PETICIONES A /api/productos
//---------------------------------------------------------------------
router.get("/", async(req, res) => {
  crearTablaProductos();
  crearTablaMensajes()

  let productosData = await productos.getAll();

  if (!productosData) {
      res.json({error: "Hubo un error al leer el archivo."});
  } else {
      res.render('pages/formulario', { title: 'listado de productos', products: productosData });
  }
});

let adminAcces = true;

io.on('connection', async (socket) => {
  console.log("Usuario Conectado" + socket.id);

  let productosData = await productos.getAll();
  let chatData = await chats.getAll();

  io.sockets.emit('productos', productosData);
  io.sockets.emit('chat', chatData);
  
  socket.on('nuevoMsg', async (msg) => {
    await chats.save(msg)
    let nuevoChat = await chats.getAll();
    io.sockets.emit('chat', nuevoChat);
  });
  
  socket.on('productoNvo', async (nuevoProducto) => {
    await productos.save(nuevoProducto)
    let productoAgregado = await productos.getAll();
    io.sockets.emit('productos', productoAgregado)
  });

});

// app.post('/form', (req, res) => {
//   const { body } = req;

//   const indice = productosData.map(elem => elem.id).sort();
//   id = indice[indice.length - 1] + 1 
  
//   const productoAgregar = {...body, id}

//   productosData.push(productoAgregar);
//   res.render('pages/productoNuevo', { productoNuevo: productoAgregar, title:'Nuevo producto agregado'});
// });

// router.post('/', (req, res) => {
//   const { body } = req; 
//   productos.save( body )

//   res.json({succes:"ok" , productoAgregado: body});
// });

// router.put('/:id', (req, res) => {
//   const { id } = req.params;
//   const { body } = req;

//   let productoModificar = productos.getAll().find(e => e.id == id);
  
//   if(productoModificar){
//   productoModificar = {...productoModificar, ...body};
//   productos.update(id, productoModificar);
//   res.json({succe:'ok', nuevo: productoModificar})
//   } else {
//     res.json({error: 'Producto no encontrado'});
//   }
// });

// router.delete('/:id', (req, res) =>{
//   const { id } = req.params;

//   const busquedaProducto = productos.getAll().find(e => e.id == id);

//   if(busquedaProducto){
//     productos.deleteById(id);
//     res.json({ succes:'ok'});
//   } else {
//     res.json({error: 'Producto no encontrado'});
//   }
// });