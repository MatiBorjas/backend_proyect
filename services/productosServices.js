import {
  getById,
  getAll,
  save,
  del,
  update,
} from "../daos/productosDaos.js";

const getProductos = async () => {
  return await getAll();
};

const getProducto = async (id) => {
  return await getById(id);
};

const saveProducto = async (producto) => {
  let necessaryProps = [
    "name",
    "thumbnail",
    "price",
    "stock",
  ];
  let keys = Object.keys(producto);
  let check = (arr, target) => target.every((e) => arr.includes(e));
  let validation = check(keys, necessaryProps);

  if (validation) {
    producto.timestamp = new Date().toString();
    await save(producto);
    return producto;
  } else {
    throw new Error("Faltan datos obligatorios");
  }
};
const deleteProducto = async (id) => {
  return await del(id);
};

const updateProducto = async (id, newBody) => {
  await update(id, newBody);
};

export {
  getProductos,
  getProducto,
  saveProducto,
  deleteProducto,
  updateProducto,
};