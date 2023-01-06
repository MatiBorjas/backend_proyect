import passport from "passport";

import {
  loginPassport,
  signUpPassport,
  serializeUser,
  deserializeUser,
} from "./midPassport.js";
import { redisSession } from "../src/config/redisConfig.js";

const sessionMiddleware = (app) => {
  redisSession(app);

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