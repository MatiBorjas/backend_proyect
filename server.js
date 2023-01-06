import express from "express";
import { cors }from "cors";

import { sessionMiddleware } from "./middlewares/session.js";
import { ejsEngine } from "./middlewares/ejsEngine.js";

import { PORT } from "./src/config/config.js";
import { connectMongoDB } from "./daos/mongoDb.js";
import { Router } from "./routes/Router.js";

const app = express();
app.use(cors());

connectMongoDB();
ejsEngine(app, express);
sessionMiddleware(app);

Router(app);

app.listen(PORT, () => {
  console.log("Servidor Funcionando en Puerto: " + PORT);
});
app.on("error", (error) => console.log(`Error en servidor ${error}`));