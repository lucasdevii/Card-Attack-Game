import { getCards } from "../controllers/cardsController.js"
import express from "express"

const router = express.Router();

router.get("/cards", getCards);

router.post("/auth/cadaster", (req, res) => {
    return res.status(200).json({"message": "Sucesso!"});
});

export default router;