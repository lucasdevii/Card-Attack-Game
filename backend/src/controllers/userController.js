import {createUser} from "../middlewares/userMiddleware.js";

const userCadaster = async (req, res) => {
    const { username, email, password, passwordConfirmation } = req.body;
    await createUser(username, email, password, passwordConfirmation);
    res.status(201).json({"message": "User created successfully!"});
}