import { create, get, post, del, deleteAllCarrito } from "../daos/carritoDaos";

const createCarrito = async (userId) => {
  return await create(userId);
};

const getCarrito = async (cartId) => {
  return await get(cartId);
};

const saveToCarrito = async (cartId, product) => {
  return await post(cartId, product);
};

const deleteProdInCarrito = async (cartId, product) => {
  return await del(cartId, product);
};

const deleteCarrito = async (cartId) => {
  return await deleteAllCarrito(cartId);
};

export {
  createCarrito,
  getCarrito,
  saveToCarrito,
  deleteProdInCarrito,
  deleteCarrito,
};