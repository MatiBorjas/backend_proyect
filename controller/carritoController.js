import {
  getCarrito,
  saveToCarrito,
  deleteProdInCarrito,
  deleteCarrito,
} from "../services/carritoServices.js"

import { getProducto } from "../services/productosServices.js";

import { emailDeCompra } from "../services/emailServices.js";
import { enviarSMS } from "../services/smsServices.js";
import { enviarWhatsapp } from "../services/whatsappServices.js";


const carritoController = {
  get: async (req, res) => {
    try {
      if (req.isAuthenticated()) {
        let cart = await getCarrito(req.user.cart_id);

        res.render("pages/carrito", { cartValid: true, cart });
      }
    } catch (error) {
      console.error({
        error: error.message,
      });
      res.status(500).send({
        status: 500,
        message: error.message,
      });
    }
  },

  post: async (req, res) => {
    try {
      let cartId = await getCarrito(req.user.cart_id);
      let productoAlCarrito = await getProducto(req.body.prod_id);
      await saveToCarrito(cartId.id, productoAlCarrito);

      res.redirect("/carrito");
    } catch (error) {
      console.error({
        error: error.message,
      });
      res.status(500).send({
        status: 500,
        message: error.message,
      });
    }
  },

  deleteProdbyPage: async (req, res) => {
    try {
      const { id } = req.params;
      let cartId = await getCarrito(req.user.cart_id);
      let productoEnCarrito = await getProducto(id);

      let cart = await deleteProdInCarrito(cartId.id, productoEnCarrito);

      res.render("pages/carrito", { cartValid: true, cart });
    } catch (error) {
      console.error({
        error: error.message,
      });
      res.status(500).send({
        status: 500,
        message: error.message,
      });
    }
  },

  deleteProd: async (req, res) => {
    try {
      const { id, idProd } = req.params;

      let cartId = await getCarrito(id);
      let productoEnCarrito = await getProducto(idProd);

      let cart = await deleteProdInCarrito(cartId.id, productoEnCarrito);

      res.json(cart);
    } catch (error) {
      console.error({
        error: error.message,
      });
      res.status(500).send({
        status: 500,
        message: error.message,
      });
    }
  },

  postBuy: async (req, res) => {
    try {
      let cart = await getCarrito(req.user.cart_id);
      let user = req.user;

      const formattedProducts = cart.products.map(
        (producto) =>
          `Producto: ${producto.name} <br />
        Precio: $${producto.price}
        `
      );

      await emailDeCompra(formattedProducts, user);
      // await enviarSMS("La compra fue confirmada, su pedido esta en proceso");
      // await enviarWhatsapp(
      //   "Se ha creado una nueva orden de compra de parte de: " + req.user.name
      // );

      await deleteCarrito(req.user.cart_id);

      res.redirect("/home");
    } catch (error) {
      console.error({
        error: error.message,
      });
      res.status(500).send({
        status: 500,
        message: error.message,
      });
    }
  },
};

export { carritoController };