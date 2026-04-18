import { createUser } from "./user.service.js";
import { userSchema } from "./user.schema.js";

export const userCadaster = async (req, res, next) => {
    try {
        const validatedData = userSchema.parse(req.body);
        const { username, email, password } = validatedData;
        await createUser(username, email, password);
        res.status(201).json({ message: "User created successfully!" });
    } catch (error) {
        next(error);
    }
};