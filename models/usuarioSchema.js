import mongoose from "mongoose";

const UsuarioSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, index: { unique: true } },
    age: { type: Number, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    image: { type: String, required: false },
    cart_id: { type: mongoose.Schema.ObjectId },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model("Usuarios", UsuarioSchema);