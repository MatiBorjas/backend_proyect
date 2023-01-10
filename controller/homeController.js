import { createCarrito } from "../services/carritoServices.js";
import { usuarioUpdate } from "../services/usuarioServices.js";

const homeController = {
  get: async (req, res) => {

    // res.json({
    //   user: req.user ? req.user : false,
    //   query: req.query.secret_token ? req.query.secret_token : false,
    //   session: req.session,
    //   isAuthenticated: req.isAuthenticated(),
    // });

    try {
      if (req.isAuthenticated()) {
        const { cart_id } = req.user;

        if (!cart_id) {
          let newCartId = await createCarrito(req.user._id);
          await usuarioUpdate(req.user._id, newCartId);
        }
        res.render("pages/home", {
          name: req.user.name,
        });
      } else {
        res.redirect("/login");
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

  getInfo: async (req, res) => {
    try {
      if (req.isAuthenticated()) {
        res.render("pages/infoUsuario", {
          user: req.user,
        });
        res.end();
      } else {
        res.redirect("/login/faillogin");
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
};

export { homeController };