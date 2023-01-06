import { passport } from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import JWTStrategy from "passport-jwt";
import ExtractJWT from "passport-jwt";

import Usuarios from "../models/usuarioSchema";

import { isValidPassword, createHash } from "../src/utils/passwordsFunctions";

const loginPassport = {
  localStrategy: new LocalStrategy((username, password, done) => {
    Usuarios.findOne({ username: username }, (err, user) => {
      if (err) return done(err);
      if (!user) {
        console.error({ message: "El usuario no fue encontrado con el nombre: " + username });
        return done(null, false);
      }
      if (!isValidPassword(user, password)) {
        console.log({ message: "Password incorrecta" });
        return done(null, false);
      }

      return done(null, user);
    });
  }),
};

const signUpPassport = {
  localStrategy: new LocalStrategy(
    { passReqToCallback: true },
    (req, username, password, done) => {
      Usuarios.findOne({ username: username }, function (error, user) {
        if (error) {
          console.error({ message: "Error al registrarse: " + error });

          return done(error);
        }

        if (user) {
          console.log({ message: "El usuario ya existe" });
          return done(null, false);
        }

        const { name, age, address, phone } = req.body;
        const newUser = {
          username: username,
          password: createHash(password),
          name,
          age,
          address,
          phone,
          image: req.file?.filename ? req.file.filename : "",
        };

        Usuarios.create(newUser, (err, user) => {
          if (err) {
            console.error({ message: "Error guardando el usuario: " + err });

            return done(err);
          }
          console.log({ message: "El usuario fue registrado correctamente" });

          return done(null, user);
        });
      });
    }
  ),
};

const passportJwt = {
  strategy: new JWTStrategy(
    {
      secretOrKey: "top_secret",
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter("secret_token"),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        return next(error);
      }
    }
  ),
};

const serializeUser = () => {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
};
const deserializeUser = () => {
  passport.deserializeUser((id, done) => {
    Usuarios.findById(id, done);
  });
};

export {
  loginPassport,
  signUpPassport,
  serializeUser,
  deserializeUser,
  passportJwt,
};