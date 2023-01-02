import { Router } from "express";
import { passport } from "passport";
import { loginController } from "../controller/loginController.js";
import jwt from "jsonwebtoken";
import { loginController } from "../controller/loginController.js";

const loginRouter = Router();

loginRouter.get("/", loginController.get);
loginRouter.get("/faillogin", loginController.errorLogin);

loginRouter.post(
  "/", 
  // passport.authenticate("login", { failureRedirect: "/login/faillogin" }),
  // loginController.postLogin

  (req, res, next) => {
      passport.authenticate("login", (err, user, info) => {
        try {
          if (err || !user) {
            // const error = new Error("new Error");
            // return next(error);
            return res.redirect("login/faillogin");
          }
          req.login(user, { session: false }, (err) => {
            if (err) return next(err);
            const body = { _id: user._id, email: user.username };
            const token = jwt.sign({ user: body }, "top_secret");
            // return res.json({ token });
            return next();
          });
        } catch (error) {
          return next(error);
        }
      })(req, res, next);
    },
    loginController.tokenLogin,
    loginController.postLogin
);

export { loginRouter };