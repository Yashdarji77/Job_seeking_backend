class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  if (err.name === "CaseError") {
    const message = `Resource not found. Invalid ${err.path}`;
    err = ErrorHandler(message, 400);
  }
  if (err.code === 11000) {
    const message = `Dublicate ${Object.keys(err.keyValue)} Entered`;
    err = ErrorHandler(message, 400);
  }
  if (err.name === "JsonWebToken") {
    const message = `Json Web Token is Invalid,Try Again`;
    err = ErrorHandler(message, 400);
  }
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is expired,Try Again`;
    err = ErrorHandler(message, 400);
  }

  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default ErrorHandler;
