import { Router } from "express";
import * as Controller from "./controller";

const flightlabsRouter = Router();

flightlabsRouter.post("/best-flight", Controller.default.postBestFlight);
flightlabsRouter.post("/all-data", Controller.default.getAllData);

export default flightlabsRouter;