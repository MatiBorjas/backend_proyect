import { emailRegistro } from "../services/emailServices.js";

const signupController = {
    get: (req, res) => {
      try {
        if (req.isAuthenticated()) {
          res.redirect("/home");
        } else {
          res.render("pages/signup");
        }
      } catch (error) {
        return res
          .status(500)
          .send({ status: "Get page Sign Up error", body: error });
      }
    },
    postsignup: async (req, res) => {
      try {
        const { username, name, age, address, phone  } = req.user;
        req.session.username = username;
        await emailRegistro(username, name, age, address, phone);
        res.redirect("/home");
      } catch (error) {
        return res.status(500).send({ status: "Sign Up error", body: error });
      }
    },
  
    errorSignup: (req, res) => {
      try {
        res.render("pages/errorSignup");
      } catch (error) {
        res.status(500).send({ status: "Sign Up error", body: error });
      }
    },
  };

  export { signupController };