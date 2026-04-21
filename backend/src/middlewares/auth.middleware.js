import jwt from 'jsonwebtoken';

export const isGuest = (req, res, next) => {
    // Lógica para verificar se o usuário é um convidado (não autenticado)
    const token = req.cookies.token;
    if (!token) {
        next();
    } else {
        return res.status(401).json({"message": "Apenas usuários não autenticados!"});
    }
}

export const isAuth = (req, res, next) => {
    // Lógica para verificar se o usuário está autenticado
    const token = req.cookies.token;
    if (token) {
        next();
    } else {
        return res.status(401).json({"message": "Apenas usuários autenticados!"});
    }
}

export const authTokenMiddleware = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Armazena os dados do usuário decodificados no objeto de requisição

        next();
    } catch (err) {
        return res.status(401).json({ error: 'Token inválido' });
    }
};