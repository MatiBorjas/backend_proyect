import { Router } from "express";

const carritoRouter = Router();

import carritoController from "../controller/carritoController";

carritoRouter.get("/", carritoController.get);
carritoRouter.post("/product", carritoController.post);
carritoRouter.delete("/:id", carritoController.deleteProdbyPage);
carritoRouter.delete("/:id/:idProd", carritoController.deleteProd);
carritoRouter.post("/", carritoController.postBuy);

export { carritoRouter }