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