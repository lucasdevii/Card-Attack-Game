import fs from "fs";
import path from "path"
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

export const getCards = (req, res) => {
    const cards = fs.readFileSync(path.join(__dirname, "../mocks/cards.json"), "utf-8");
    res.status(200).json(JSON.parse(cards))
}