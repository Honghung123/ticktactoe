const CustomError = require("./../errors/CustomError");
module.exports = {
  badRequest: (req, res, next) => {
    statusCode = 404;
    res.status(statusCode).render("error", {
      layout: false,
      status: statusCode,
      message: "File or Link Not Found",
      description: "Description error",
    });
  },

  internalServer: (error, req, res, next) => {
    let statusCode = 500;
    if (error instanceof CustomError) {
      statusCode = error.statusCode;
    }
    res.status(statusCode || 500).render("error", {
      status: statusCode || 500,
      message: error.message || "Internal Server Error",
      description: error.stack,
    });
  },
};
