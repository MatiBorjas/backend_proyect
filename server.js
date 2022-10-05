//---------------------------------------------------------------------
//        EXPRESS
//---------------------------------------------------------------------
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import productosRouter from "./routes/productos.js";

//---------------------------------------------------------------------
//       Creacion de servidor e implementacion Websockets.Io
//---------------------------------------------------------------------
const app = express();
const PORT = process.env.PORT || 8080;
const httpServer = createServer(app);
const io = new Server(httpServer, {});

//Inicio del servidor
httpServer.listen(PORT, () => console.log("Servidor funcionando en puerto " + `${PORT}`));

//---------------------------------------------------------------------
//        MIDDLEWARE
//---------------------------------------------------------------------

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
app.use(express.static(__dirname + "/public"));


//Motor ejs
app.set('view engine', 'ejs');
app.set("views", "./views");

//Ruta de api
app.use("/api/productos", productosRouter)


//---------------------------------------------------------------------
//        PETICIONES A /
//---------------------------------------------------------------------
app.get("/", (req, res) => {
  res.render("pages/home", { name: "Juan Carlos" });
});


//Socket
import { socketModel } from "./src/utils/socket.js";
socketModel(io);













// //---------------------------------------------------------------------
// //        PETICIONES A /api/productos
// //---------------------------------------------------------------------
// router.get("/", async(req, res) => {
//   crearTablaProductos();
//   crearTablaMensajes()

//   let productosData = await productos.getAll();

//   if (!productosData) {
//       res.json({error: "Hubo un error al leer el archivo."});
//   } else {
//       res.render('pages/formulario', { title: 'listado de productos', products: productosData });
//   }
// });

// let adminAcces = true;

// io.on('connection', async (socket) => {
//   console.log("Usuario Conectado" + socket.id);

//   let productosData = await productos.getAll();
//   let chatData = await chats.getAll();

//   io.sockets.emit('productos', productosData);
//   io.sockets.emit('chat', chatData);
  
//   socket.on('nuevoMsg', async (msg) => {
//     await chats.save(msg)
//     let nuevoChat = await chats.getAll();
//     io.sockets.emit('chat', nuevoChat);
//   });
  
//   socket.on('productoNvo', async (nuevoProducto) => {
//     await productos.save(nuevoProducto)
//     let productoAgregado = await productos.getAll();
//     io.sockets.emit('productos', productoAgregado)
//   });

// });

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