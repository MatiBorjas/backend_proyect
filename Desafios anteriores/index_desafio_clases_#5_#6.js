const fs = require('fs')

//---------------------------
//        CLASE
//---------------------------

class Contenedor {

  constructor(archivo) {
      this.archivo = "./archivos/"+archivo+".json"
    };

  //---------------------------
  //    METODO GET ALL
  //---------------------------
    async getAll(){
      try {
        const datos = await fs.promises.readFile(this.archivo,'utf-8');
        let datosParse = JSON.parse(datos);
        return datosParse;
      } 
      catch (error) {
        console.log('Hubo un error en la lectura de archivos')
      }
    };


  //---------------------------
  //  METODO PRODUCTO RANDOM
  //---------------------------
    async productoRandom(){
      try {
        const datos = await fs.promises.readFile(this.archivo,'utf-8');
        let datosParse = JSON.parse(datos);
        let randomIndex = Math.floor(Math.random()*datosParse.length);
        let productoRandom = datosParse[randomIndex];
        
        return productoRandom;
      } 
      catch (error) {
        console.log('Hubo un error en la lectura de archivos')
      }
    };
}

const productos = new Contenedor('datosEntrenamientos');

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));

// async function traerProductosData(){
//   let prod = await productos.getAll();
//   return productosData = prod; 
// }
// traerProductosData();

app.get("/", (req, res) => {
  res.send({ mensaje: "Bienvenidos a Hipercompumundo mega red" });
});

app.get("/productos", async(req, res) => {

  try {
    let products = await productos.getAll()
    res.send(products);
  } catch (error) {
    console.log(error)
  }

});

app.get("/productoRandom", async(req, res) => {
  try {
    let products = await productos.productoRandom()
    res.send(products);
  } catch (error) {
    console.log(error)
  }
});
