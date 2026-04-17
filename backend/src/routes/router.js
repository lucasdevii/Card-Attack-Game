import { getCards } from "../controllers/cardsController.js"
import { createUser } from "../controllers/userController.js"
import { isGuest } from "../middlewares/authMiddleware.js"
import express from "express"

const router = express.Router();

router.get("/cards", getCards);

router.post("/auth/cadaster", isGuest,);
router.post("/auth/login", (req, res) => {
    return res.status(200).json({"message": "Sucesso!"});
});

export default router;