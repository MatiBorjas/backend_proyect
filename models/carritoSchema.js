import mongoose from "mongoose";
import { productoSchema } from "./productosSchema";

export const carritoSchema = new mongoose.Schema(
  {
    productos: [productoSchema],
    user_id: { type: mongoose.Schema.ObjectId, required: true },
  },
  { timestamps: true }
);
export const Carritos = mongoose.model("Carrito", carritoSchema);
