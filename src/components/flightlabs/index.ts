import { Router } from "express";
import * as Controller from "./controller";
import { checkAuth } from "../auth/middleware";

const flightlabsRouter = Router();

flightlabsRouter.post("/best-flight", Controller.default.postBestFlight);
flightlabsRouter.post("/all-data", checkAuth,Controller.default.getAllData);

export default flightlabsRouter;