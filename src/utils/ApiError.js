class ApiError extends Error {
  constructor(statusCode, message, isOperational = true, stack = '') {
    super(message); // Call the parent `Error` class constructor with the error message
    this.statusCode = statusCode; // HTTP status code (e.g., 400, 404, 500)
    this.isOperational = isOperational; // Determines if the error is a known operational error

    if (stack) {
      this.stack = stack; // If a custom stack trace is provided, use it
    } else {
      Error.captureStackTrace(this, this.constructor); // Automatically generates stack trace
    }
  }
}

export default ApiError;
