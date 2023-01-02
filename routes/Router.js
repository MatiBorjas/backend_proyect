const homeRouter = require("./homeRouter");
const loginRouter = require("./loginRouter");
const logoutRouter = require("./logoutRouter");
const signupRouter = require("./signupRouter");
const infoRouter = require("./infoRouter");
const productRouter = require("./productRouter");
const cartRouter = require("./cartRouter");

const Router = (app) => {
  app.use((req, res, next) => {
    logger.info({ URL: req.originalUrl, method: req.method });
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
  app.use("/products", productRouter);
  app.use("/cart", cartRouter);

  app.all("*", (req, res) => {
    logger.warn({ URL: req.originalUrl, method: req.method });
    res.status(404).end();
  });
};

export{ Router };