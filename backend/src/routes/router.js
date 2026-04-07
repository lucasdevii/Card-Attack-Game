import { getCards } from "../controllers/cardsController.js"
import express from "express"

const router = express.Router();

router.get("/cards", getCards)

export default router