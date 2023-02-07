import { Router } from "express";
import * as Controller from "./controller";
import { checkAuth } from "./middleware";

const authRouter = Router();

authRouter.post("/login", Controller.authLogin);
authRouter.use(checkAuth);

export default authRouter;