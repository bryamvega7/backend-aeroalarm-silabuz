import { Router } from "express";
import * as Controller from "./controller";

const supabaseRouter = Router();

supabaseRouter.post("/user", Controller.default.postUser);

export default supabaseRouter;