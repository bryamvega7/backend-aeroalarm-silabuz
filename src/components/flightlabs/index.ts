import { Router } from "express";
import * as Controller from "./controller";

const flightlabsRouter = Router();

flightlabsRouter.get("/best-flight", Controller.default.getBestFlight);
flightlabsRouter.post("/best-flight", Controller.default.postBestFlight);

export default flightlabsRouter;
