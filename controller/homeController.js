import { createCarrito } from "../services/cartServices";
import { usuarioUpdate } from "../services/usuarioServices";
// import { errorLogger } from "../src/utils/loggers";

const homeController = {
  get: async (req, res) => {
    try {
      if (req.isAuthenticated()) {
        const { cart_id } = req.user;

        if (!cart_id) {
          let newCartId = await createCarrito(req.user._id);
          await usuarioUpdate(req.user._id, newCartId);
        }
        res.render("pages/home", {
          user: req.user,
        });
      } else {
        res.redirect("/login/faillogin");
      }
    } catch (error) {
      // errorLogger.error({
      //   error: error.message,
      // });
      res.status(500).send({
        status: 500,
        message: error.message,
      });
    }
  },
  getInfo: async (req, res) => {
    try {
      if (req.isAuthenticated()) {
        res.render("pages/infoUser", {
          user: req.user,
        });
        res.end();
      } else {
        res.redirect("/login/faillogin");
      }
    } catch (error) {
      // errorLogger.error({
      //   error: error.message,
      // });
      res.status(500).send({
        status: 500,
        message: error.message,
      });
    }
  },
};

export { homeController };