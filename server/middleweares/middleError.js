const ApiError = require("../exeptions/api-errors");

function middleWare(err, req, res, next) {
  console.log(err, "err");
  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors });
  }

  res.status("500").json({ message: "Непредвиденная ошибка" });
}

module.exports = middleWare;
