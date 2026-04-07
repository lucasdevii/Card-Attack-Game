import express from "express"
import cors from "cors"
import router from "./src/routes/router.js"

const app = express();

app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}));
app.use(express.json())
app.use("/api", router)

const PORT = 8000;

app.listen(PORT, () => {
    console.log("Servidor rodando na porta: " + PORT)
})

export default app;