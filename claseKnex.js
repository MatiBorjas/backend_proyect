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
  getAll = () => {
    try {
      let datos;
      this.knex(this.table)
        .select('*')
        .then((res) => res)
        .catch((e) => console.log('Error: ' + e))
        datos = res;
      return datos;
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
      let guardar = this.knex(this.table)
        .insert(obj)
        .then((res) => res)
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
