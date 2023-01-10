import mongoose from "mongoose";
import { productoSchema } from "./productosSchema.js";

const carritoSchema = new mongoose.Schema(
  {
    products: [productoSchema],
    user_id: { type: mongoose.Schema.ObjectId, required: true },
  },
  { timestamps: true }
);

const Carritos = mongoose.model("Carrito", carritoSchema);

export { carritoSchema, Carritos }