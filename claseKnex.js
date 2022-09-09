//---------------------------------------------------------------------
//        CLASE Knex
//---------------------------------------------------------------------

class ContenedorKnex {

  constructor(knex, table) {
      this.knex = knex;
      this.table = table;
    };

  //---------------------------------------------------------------------
  //    METODO GET ALL
  //---------------------------------------------------------------------
  async getAll(){
    try {
      const productos = await this.knex(this.table)
          return productos;
    } 
    catch (error) {
      console.log('Hubo un error en la lectura de archivos ' + error)
    }
  };

  //---------------------------------------------------------------------
  //        METODO SAVE
  //---------------------------------------------------------------------
  async save(obj) {
    try{
      let guardar = await this.knex(this.table)
        .insert(obj)
        .then((res) => console.log('El producto fue agregado exitosamente'))
        .catch((err) => console.log(err))
        .finally(() => this.knex.destroy());
      return guardar;
    }
    catch(error){
      console.log('ERROR! ' + error)
    }
  };
}

module.exports = ContenedorKnex;
