export const errorHandler = (err, req, res, next) => {
  console.error(err); // log pra debug

  const status = err.status || 500;

  return res.status(status).json({
    message: err.message || "Erro interno do servidor"
  });
};