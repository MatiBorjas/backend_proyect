import { Router } from "express";
import { productosController } from "../controller/productosController.js";

const productosRouter = Router();

productosRouter.get("/", productosController.get);
productosRouter.get("/:id", productosController.getIdProduct);
productosRouter.post("/", productosController.post);
productosRouter.delete("/:id", productosController.delete);
productosRouter.put("/:id", productosController.put);

export { productosRouter };