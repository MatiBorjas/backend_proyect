//---------------------------------------------------------------------
//        EXPRESS
//---------------------------------------------------------------------
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import productosRouter from "./routes/productos.js";

//---------------------------------------------------------------------
//       Creacion de servidor e implementacion Websockets.Io
//---------------------------------------------------------------------
const app = express();
const PORT = process.env.PORT || 8080;
const httpServer = createServer(app);
const io = new Server(httpServer, {});

//Inicio del servidor
httpServer.listen(PORT, () => console.log("Servidor funcionando en puerto " + `${PORT}`));

//---------------------------------------------------------------------
//        MIDDLEWARE
//---------------------------------------------------------------------

import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Motor ejs
app.set('view engine', 'ejs');
app.set("views", "./views");

//Ruta de api
app.use("/api/productos", productosRouter)


//---------------------------------------------------------------------
//        PETICIONES A /
//---------------------------------------------------------------------
app.get("/", (req, res) => {
  res.render("pages/home", { name: "Juan Carlos" });
});


//Socket
import { socketModel } from "./src/utils/socket.js";
socketModel(io);
