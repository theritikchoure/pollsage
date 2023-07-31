const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if(err.message === 'Not allowed by CORS') {
    return res.status(401).send('Unauthorized');
  }

  res.status(500).json({ message: "Internal Server Error" });
};

module.exports = errorHandler;
