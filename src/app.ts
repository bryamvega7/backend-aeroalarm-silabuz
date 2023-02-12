import express, { type Application } from "express";
import routes from "./router";
import cors from "./components/cors/cors";

const app: Application = express();

app.use(express.json());
app.use(cors);

routes(app);

export default app;
