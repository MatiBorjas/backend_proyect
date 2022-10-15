//---------------------------------------------------------------------
//        EXPRESS
//---------------------------------------------------------------------
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import session from "express-session";
import { productosRouter, homeRouter, loginRouter  } from "./routes/index.js";
import { socketController } from "./src/utils/socketController.js"
import MongoStore from "connect-mongo";

//---------------------------------------------------------------------
//       Creacion de servidor e implementacion Websockets.Io
//---------------------------------------------------------------------
const app = express();
const PORT = process.env.PORT || 8080;
const httpServer = createServer(app);
const io = new Server(httpServer, {});
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
socketController(io);

//Inicio del servidor
httpServer.listen(PORT, () => console.log("Servidor funcionando en puerto " + `${PORT}`));

//---------------------------------------------------------------------
//        MIDDLEWARE
//---------------------------------------------------------------------

import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Motor ejs
app.set('view engine', 'ejs');
app.set("views", "./views");

//Ruta de api
app.use("/api/productos", productosRouter)


app.use(
  session({
    store: MongoStore.create({
      mongoUrl: 
        "mongodb+srv://admin:admin123@ecommerce.sewmc4q.mongodb.net/test",
      mongoOptions: advancedOptions,
    }),
    secret: "secreto",
    cookie: { maxAge: 600000 },
    //resave viene de la documentacion
    resave: false,
    saveUninitialized: false,
  })
);

app.use((req, res, next) => {
  req.session.touch();
  next();
});

//---------------------------------------------------------------------
//        PETICIONES A /
//---------------------------------------------------------------------
app.get("/", (req, res) => {
  res.send("Bienvenidos a Hipercompumundomegared");
});

app.use("/api/productos-test", productosRouter);
app.use("/login", loginRouter);
app.use("/home", homeRouter);

app.get("/logout", (req, res) => {
  let username = req.session.username;

  req.session.destroy((err) => {
    if (err) {
      return res.json({ status: "Logout ERROR", body: err });
    }
    res.render("pages/logout", { name: username });
  });
});

//Socket
// import { socketModel } from "./src/utils/socket.js";
// socketModel(io);
