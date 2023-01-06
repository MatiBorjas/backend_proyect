import { Router } from "express";
import { homeController } from "../controller/homeController.js";
const homeRouter = Router();

homeRouter.get("/", homeController.get);
homeRouter.get("/info", homeController.getInfo);


export { homeRouter };