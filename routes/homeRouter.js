import { Router } from "express";
import { passport } from "passport";
import { homeController } from "../controller/homeController";
import { passportJwt } from "../middlewares/passport";
const homeRouter = Router();

homeRouter.get("/", passport.authenticate("jwt", { session: false }),
homeController.get
);
homeRouter.get("/info", homeController.getInfo);

export { homeRouter };