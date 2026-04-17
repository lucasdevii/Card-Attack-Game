import express from "express"
import cors from "cors"
import router from "./src/routes/router.js"
import dotenv from "dotenv"
import cookiesParser from "cookie-parser"

import path from "path"
import {fileURLToPath} from "url"

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}));
app.use(express.json());
app.use(cookiesParser());
app.use("/assets", express.static(path.join(__dirname, "src/public"))); //Pega apenas o caminho da pasta public e troca por assets
app.use("/api", router);

const PORT = 8000;

app.listen(PORT, () => {
    console.log("Servidor rodando na porta: " + PORT)
})

export default app;