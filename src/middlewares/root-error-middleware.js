const rootErrorHandler = (err, req, res, next) => {
  if (err) {
    res.status(500).send({ error: err.message });
  } else {
    next();
  }
};

module.exports = { rootErrorHandler };
