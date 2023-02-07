import { Router } from "express";
import * as Controller from "./controller";

const loginRouter: Router = Router();

loginRouter.post("/", Controller.login);

export default loginRouter;
