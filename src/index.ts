import { config } from "dotenv";
import app from "./app";

config();

const port = process.env.PORT;

app.listen(port, () => console.log(`Server init at ${port}`));