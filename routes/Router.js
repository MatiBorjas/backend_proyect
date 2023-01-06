import { homeRouter } from "./homeRouter";
import { loginRouter } from "./loginRouter";
import { logoutRouter } from "./logoutRouter";
import { signupRouter } from "./signupRouter";
import { infoRouter } from "./infoRouter";
import { productosRouter } from "./productosRouter";
import { carritoRouter } from "./carritoRouter";

const Router = (app) => {
  app.use((req, res, next) => {
    console.log({ URL: req.originalUrl, method: req.method });
    next();
  });

  app.get("/", (req, res) => {
    res.redirect("/login");
  });

  app.use("/login", loginRouter);
  app.use("/signup", signupRouter);
  app.use("/logout", logoutRouter);
  app.use("/home", homeRouter);
  app.use("/info", infoRouter);
  app.use("/productos", productosRouter);
  app.use("/carrito", carritoRouter);

  app.all("*", (req, res) => {
    console.log({ URL: req.originalUrl, method: req.method });
    res.status(404).end();
  });
};

export{ Router };