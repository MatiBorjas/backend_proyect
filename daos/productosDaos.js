import { Productos } from "../models/productosSchema.js";

const getAll = async () => {
  try {
    return await Productos.find({});
  } catch (error) {
    throw Error(error);
  }
};

const getById = async (id) => {
  try {
    return await Productos.findById(id);
  } catch (error) {
    throw Error(error);
  }
};

const save = async (producto) => {
  try {
    await Productos.create(producto);
    return;
  } catch (error) {
    throw new Error(error);
  }
};

const del = async (id) => {
  try {
    await Productos.findByIdAndDelete(id);
    return id;
  } catch (error) {
    throw new Error(error);
  }
};

const update = async (id, newBody) => {
  try {
    await Productos.findByIdAndUpdate(id, newBody);
    return await getById(id);
  } catch (error) {
    throw new Error(error);
  }
};

export { getAll, getById, save, del, update };