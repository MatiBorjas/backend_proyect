import {
  getProductos,
  getProducto,
  saveProducto,
  deleteProducto,
  updateProducto,
} from "../services/productosServices.js";

const productosController = {
  get: async (req, res) => {
    try {
      let products = await getProductos();
      if (req.headers.postman) {
        res
          .status(200)
          .json({
            products,
          })
          .end();
      } else {
        res.render("pages/productos", {
          products,
          message: false,
        });
      }
    } catch (error) {
      res.status(500).send({
        status: 500,
        error: error.message,
      });
    }
  },

  getIdProduct: async (req, res) => {
    const { id } = req.params;
    try {
      let products = await getProducto(id);
      res.status(200).json({
        products,
      });
    } catch (error) {
      res.status(500).send({
        status: 500,
        error: error.message,
      });
    }
  },

  post: async (req, res) => {
    try {
      const { body } = req;
      let product = await saveProducto(body);

      res.status(200).json({
        product,
      });
    } catch (error) {
      res.status(500).send({
        status: 500,
        message: error.message,
      });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      await deleteProducto(id);

      res.status(200).json({
        message: "Producto borrado " + id,
      });
    } catch (error) {
      res.status(500).send({
        status: 500,
        message: error.message,
      });
    }
  },

  put: async (req, res) => {
    try {
      const { id } = req.params;
      const { body } = req;
      let puttedProduct = await updateProducto(id, body);
      res.status(200).send({
        status: 200,
        data: { product: puttedProduct },
        message: "Producto actualizado",
      });
    } catch (error) {
      res.status(500).send({
        status: 500,
        message: error.message,
      });
    }
  },
};

export { productosController };