const fs = require('fs');
const { parse } = require('path');

class Contenedor {

    constructor(archivo) {
        this.archivo = "./archivos/"+archivo+".json"
      };
    

//---------------------------
//        METODO SAVE
//---------------------------
    async save(obj){
      try{
        const datos = await fs.promises.readFile(this.archivo,'utf-8')
        let datosJson = JSON.parse(datos);
        let entrenamientos = [];
        const indice = datosJson.map(elem => elem.id).sort();
        obj.id = indice[indice.length - 1] + 1 

        if(!obj.id){
          obj.id = 1;
          entrenamientos = [{...obj}];
          await fs.promises.writeFile(this.archivo, JSON.stringify(entrenamientos));
          return entrenamientos[0].id
        }

        datosJson.push(obj)

        await fs.promises.writeFile(this.archivo, JSON.stringify(datosJson))
        console.log(`El elemento: \n${JSON.stringify(obj)} \nfue guarado exitosamente`)
      }
      catch(error){
        console.log('ERROR! ' + error)
      }

    };

//---------------------------
//METODO DELETE BY ID
//---------------------------

  async getById(id){
    try {
      const datos = await fs.promises.readFile(this.archivo,'utf-8')
      let datosJson = JSON.parse(datos);
      
      if(datosJson.find(elemento => elemento.id === id)){
        console.log(datosJson.find(elemento => elemento.id === id))
      } else {
        console.log(`El elemento con id numero ${id} no existe`)
      }
    }
    catch (error) {
      console.log('La busqueda no pudo realizarse correctamente' + error);
    }
  };

//---------------------------
//    METODO GETALL
//---------------------------
  async getAll(){
    try {
      const datos = await fs.promises.readFile(this.archivo,'utf-8');
      return console.log(JSON.parse(datos));      
    } 
    catch (error) {
      console.log('Hubo un error en la lectura de archivos')
    }
    
  };

//---------------------------
//METODO DELETE BY ID
//---------------------------

  async deleteById(id){
    try {
      const datos = await fs.promises.readFile(this.archivo,'utf-8');
      let datosJson = JSON.parse(datos);

      if(datosJson.some(elemento => elemento.id === id)){
        let objIndex = datosJson.indexOf(datosJson.find(elemento => elemento.id === id));
        datosJson.splice(objIndex, objIndex);
        await fs.promises.writeFile(this.archivo, JSON.stringify(datosJson));
        console.log(`El elemento con id: ${id} fue eliminado con exito`)

      } else {
        console.log(`No existe un elemento con el id ${id}`)
      }
    } 
    catch (error) {
      
    }
  };

  //---------------------------
//METODO DELETE ALL
//---------------------------

  async deleteAll(){
    try {
      await fs.promises.writeFile(this.archivo, '[]');
      console.log('Todos los elementos del archivo han sido eliminados')
    } catch (error) {
      console.log(error)
    }
  };
}


// ---------------------------------------------------------------------

const objetoInicial1 = {
  nombre: 'Matias',
  apellido: 'Borjas'
}

const objetoInicial2 = {
  nombre: 'Zoila',
  apellido: 'Cerda'
}

const objetoInicial3 = {
  nombre: 'Elba',
  apellido: 'Garto'
}

const objeto1 = new Contenedor('datosEntrenamientos');
// objeto1.traerDatos();
// objeto1.save(objetoInicial3);
// objeto1.getAll();
// objeto1.getById(3);
// objeto1.deleteById(3);
// objeto1.deleteAll();