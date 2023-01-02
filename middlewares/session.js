import passport from "passport";

import {
  loginPassport,
  signUpPassport,
  serializeUser,
  deserializeUser,
  passportJwt,
} from "./passport";
import { redisSession } from "../src/config/redisConfig";

const sessionMiddleware = (app) => {
  redisSession(app);

  passport.use("login", loginPassport.localStrategy);
  passport.use("signup", signUpPassport.localStrategy);
  passport.use("jwt", passportJwt.strategy);

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