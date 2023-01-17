import passport from "passport";
import { mongoSession } from "../src/config/mongoSessionConfig.js";

import {
  loginPassport,
  signUpPassport,
  serializeUser,
  deserializeUser,
} from "./midPassport.js";

const sessionMiddleware = (app) => {
  mongoSession(app);
  passport.use("login", loginPassport.localStrategy);
  passport.use("signup", signUpPassport.localStrategy);
  serializeUser();
  deserializeUser();
  
  app.use(passport.initialize());
  app.use(passport.session());
  app.use((req, res, next) => {
    req.session.touch();
    next();
  });
};
export { sessionMiddleware };
