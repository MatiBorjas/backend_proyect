const fs = require('fs')

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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/productos', router)
app.use('/public', express.static(__dirname + '/public'));


//---------------------------------------------------------------------
//        Motor EJS
//---------------------------------------------------------------------
app.set('view engine', 'ejs');


//---------------------------------------------------------------------
//        CLASE
//---------------------------------------------------------------------

class Contenedor {

  constructor(archivo) {
      this.archivo = "./archivos/"+archivo+".json"
    };

  //---------------------------------------------------------------------
  //    METODO GET ALL
  //---------------------------------------------------------------------
  getAll = () => {
    try {
      const datos = fs.readFileSync(this.archivo,'utf-8');
      let datosParse = JSON.parse(datos);
      return datosParse;
    } 
    catch (error) {
      console.log('Hubo un error en la lectura de archivos')
    }
  };

  //---------------------------------------------------------------------
  //        METODO SAVE
  //---------------------------------------------------------------------
  save = (obj) => {
    try{
      const datos = fs.readFileSync(this.archivo,'utf-8')
      let datosJson = JSON.parse(datos);
      let entrenamientos = [];
      const indice = datosJson.map(elem => elem.id).sort();
      obj.id = indice[indice.length - 1] + 1 

      if(!obj.id){
        obj.id = 1;
        entrenamientos = [{...obj}];
        fs.writeFileSync(this.archivo, JSON.stringify(entrenamientos));
        return entrenamientos[0].id
      }
      datosJson.push(obj)

      fs.writeFileSync(this.archivo, JSON.stringify(datosJson))
      console.log(`El elemento: \n${JSON.stringify(obj)} \nfue guarado exitosamente`)
    }
    catch(error){
      console.log('ERROR! ' + error)
    }
  };

  //---------------------------------------------------------------------
  //    METODO GET BY ID
  //---------------------------------------------------------------------

  getById = (id) => {
    try {
      const datos = fs.readFileSync(this.archivo,'utf-8')
      let datosJson = JSON.parse(datos);
      
      if(datosJson.find(elemento => elemento.id === id)){
        return (datosJson.find(elemento => elemento.id === id));
      } else {
        console.log(`El elemento con id numero ${id} no existe`)
      }
    }
    catch (error) {
      console.log('La busqueda no pudo realizarse correctamente' + error);
    }
  };

  //---------------------------------------------------------------------
  //     METODO UPDATE
  //---------------------------------------------------------------------
  update = (id, obj) => {
    try {
      let productosData = this.getAll();
      let productosActualizados = productosData.map(e => 
        e.id == id
        ? e = {...e, ...obj}
        : e);

      fs.writeFileSync(this.archivo, JSON.stringify(productosActualizados));
      console.log('Update complete')

    } catch (error) {
      
    }
  };

  //---------------------------------------------------------------------
  //METODO DELETE BY ID
  //---------------------------------------------------------------------

  deleteById = (id) => {
    try {
      const datos = fs.readFileSync(this.archivo,'utf-8');
      let datosJson = JSON.parse(datos);

      if(datosJson.some(elemento => elemento.id == id)){
        let objIndex = datosJson.indexOf(datosJson.find(elemento => elemento.id == id));
        datosJson.splice(objIndex, objIndex + 1);
        console.log(datosJson)
        fs.writeFileSync(this.archivo, JSON.stringify(datosJson));
        console.log(`El elemento con id: ${id} fue eliminado con exito`)
      } else {
        console.log(`No existe un elemento con el id ${id}`)
      }
    } 
    catch (error) {
      
    }
  };

}

const productos = new Contenedor('datosEntrenamientos');
const chats = new Contenedor('chats');


//---------------------------------------------------------------------
//        PETICIONES A /
//---------------------------------------------------------------------
app.get("/", (req, res) => {
  res.send({ mensaje: "Bienvenidos a Hipercompumundo mega red" });
});

//---------------------------------------------------------------------
//        PETICIONES A /public
//---------------------------------------------------------------------

app.post("/public", (req, res) => {

  const { body } = req;
  productos.save( body )

  res.json({succes:"ok" , productoAgregado: body});
});

//---------------------------------------------------------------------
//        PETICIONES A /api/productos
//---------------------------------------------------------------------
router.get("/", (req, res) => {

  let productosData =  productos.getAll();
  if (!productosData) {
      res.json({error: "Hubo un error al leer el archivo."});
  } else {
      res.render('pages/productosLista', { title: 'listado de productos', products: productosData });
  }
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  busquedaId = productos.getAll().find(e => e.id == id);

  if(busquedaId){
    res.render('pages/unProducto',{ producto: busquedaId, title:`Detalle del producto ${busquedaId.nombre}` })
  } else {
    res.render('pages/noProduct', {error: "producto no encontrado"})
  }
});

app.get('/form', (req, res) => {
  res.render('pages/formulario',{ title: 'listado de productos' });
});



let productosData = productos.getAll();
let chatData = chats.getAll();

io.on('connection', (socket) => {
  console.log("Usuario Conectado" + socket.id);
  
  io.sockets.emit('productos', productosData);
  io.sockets.emit('chat', chatData);
  
  socket.on('nuevoMsg', (msg) => {
    chats.save(msg)
    let nuevoChat = chats.getAll();
    io.sockets.emit('chat', nuevoChat);
  });
  
  socket.on('productoNvo', (nuevoProducto) => {
    productos.save(nuevoProducto)
    let productoAgregado = productos.getAll();
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