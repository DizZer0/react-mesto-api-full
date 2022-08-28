module.exports = (err, req, res, next) => {
  const { statusCode = 500, message = 'произошла ошибка' } = err;
  res.status(statusCode).send({ message: message });
  next();
};
