import { Carritos } from "../models/carritoSchema";
import Usuarios from "../models/usuarioSchema";

const create = async (userId) => {
  try {
    let newCarrito = await Carritos.create({ user_id: userId });
    return newCarrito.id;
  } catch (error) {
    throw Error(error);
  }
};

const get = async (cartId) => {
  try {
    return Carritos.findOne({ _id: cartId });
  } catch (error) {
    throw Error(error);
  }
};

const post = async (cartId, product) => {
  let carrito = await Carritos.findByIdAndUpdate(
    { _id: cartId },
    { $addToSet: { products: product } }
  );

  return;
};

const del = async (cartId, product) => {
  let carrito = await Carritos.findOne({ _id: cartId });

  let prods = carrito.products;
  let prodsfiltered = prods.filter((element) => element.name != product.name);

  let newCarrito = await Carritos.findByIdAndUpdate(
    { _id: cartId },
    { products: prodsfiltered }
  );

  return await Carritos.findOne({ _id: cartId });
};

const deleteAllCarrito = async (cartId) => {
  await Carritos.findByIdAndUpdate({ _id: cartId }, { products: [] });

  await Usuarios.findOneAndUpdate({ cart_id: cartId }, { $unset: { cart_id: 1 } });
  return;
};

export { create, get, post, del, deleteAllCarrito };