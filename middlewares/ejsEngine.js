const ejsEngine = (app, express) => {
  app.use(express.static("public"));
  // app.use(express.static(__dirname + "/public"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.set("view engine", "ejs");
  app.set("views", "./views");
};

export { ejsEngine };

