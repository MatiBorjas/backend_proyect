const fs = require('fs')

//---------------------------------------------------------------------
//        EXPRESS
//---------------------------------------------------------------------
const express = require("express");
const { Router } = express

const app = express();
const router = Router()
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));

//---------------------------
//        MIDDLEWARE
//---------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/productos', router)
app.use('/public', express.static(__dirname + '/public'));


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

    res.json({ succes:'ok', productos: productos.getAll() });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  busquedaId = productos.getAll().find(e => e.id == id);

  if(busquedaId){
    res.json(busquedaId)
  } else {
    res.json({error: "producto no encontrado"})
  }
  
});

router.post('/', (req, res) => {
  const { body } = req;
  productos.save( body )

  res.json({succes:"ok" , productoAgregado: body});
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { body } = req;

  let productoModificar = productos.getAll().find(e => e.id == id);
  
  if(productoModificar){
  productoModificar = {...productoModificar, ...body};
  productos.update(id, productoModificar);
  res.json({succe:'ok', nuevo: productoModificar})
  } else {
    res.json({error: 'Producto no encontrado'});
  }
});

router.delete('/:id', (req, res) =>{
  const { id } = req.params;

  const busquedaProducto = productos.getAll().find(e => e.id == id);

  if(busquedaProducto){
    productos.deleteById(id);
    res.json({ succes:'ok'});
  } else {
    res.json({error: 'Producto no encontrado'});
  }

})