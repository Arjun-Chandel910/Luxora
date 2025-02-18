class AppError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // Helps distinguish known errors vs. server crashes
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
