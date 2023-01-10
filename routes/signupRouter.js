import { Router } from "express";
import passport from "passport";
import { signupController } from "../controller/signupController.js";
import { upload } from "../middlewares/midMulter.js"
const signupRouter = Router();

signupRouter.get("/", signupController.get);
signupRouter.get("/failsignup", signupController.errorSignup);

signupRouter.post("/", upload,
  passport.authenticate("signup", { failureRedirect: "/signup/failsignup" }),
  signupController.postsignup
);

export { signupRouter };