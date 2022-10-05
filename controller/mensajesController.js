import mongoose from "mongoose";
import schemaMensaje from "../models/schemaMensaje.js";

class MensajesController {
  async connectMDB(){
    try {
    
      mongoose.conect(
      "mongodb+srv://admin:admin@ecommerce.sewmc4q.mongodb.net/?retryWrites=true&w=majority"),
      { useNewUrlParser: true };      
    } catch (error) {
      console.log(error);
      
    }  
  }

  async save(mensaje) {
    try {
      let timestamp = new Date();
      mensaje.timestamp = timestamp;
      await schemaMensaje.create(mensaje);
      return mensaje;
    } catch (error) {
      throw Error(error.mensaje);
    }
  }

  async getAll(options) {
    try {
      let mensaje;
      if (options?.sort == true) {
        mensaje = await schemaMensaje.find({}).sort({ timestamp: -1 });
      } else {
        mensaje = await schemaMensaje.find({});
      }

      return mensaje;
    } catch (error) {
      throw Error(error.mensaje);
    }
  } 
}

export default MensajesController;


