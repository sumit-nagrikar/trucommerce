// Import the winston logging library and configuration settings
import winston from 'winston';
import { config } from './config.js';

// Create a custom format for logging errors. This ensures that the stack trace is included in the log message if the logged entry is an instance of Error.
const enumerateErrorFormat = winston.format((info) => {
  // Check if the info object is an instance of Error (e.g., if it's an error log)
  if (info instanceof Error) {
    // Attach the error stack to the 'message' property, which will contain detailed error information (like the stack trace)
    Object.assign(info, { message: info.stack });
  }
  // Return the modified log information
  return info;
});

// Create the winston logger instance with specific configuration
const logger = winston.createLogger({
  // Set the log level dynamically based on the environment (development or production)
  // In development, use 'debug' to capture more detailed logs. In production, use 'info' for a cleaner log.
  level: config.env === 'development' ? 'debug' : 'info',

  // Define the format for the log entries
  format: winston.format.combine(
    // Apply the custom error format for error logs (to ensure stack traces are included)
    enumerateErrorFormat(),

    // In development, add colors to logs for better readability. In production, remove colors to make logs cleaner.
    config.env === 'development'
      ? winston.format.colorize()
      : winston.format.uncolorize(),

    // Enable string interpolation using the 'splat' format (e.g., logger.info('Hello %s', 'World'))
    winston.format.splat(),

    // Define the custom log format for displaying the logs.
    // It will log the timestamp, level and message for each log entry.
    winston.format.printf(
      ({ timestamp, level, message }) =>
        `${timestamp} [${level.toUpperCase()}]: ${message}`
    )
  ),

  // Define where the logs will be output (transports).
  // In this case, log entries will be output to the console.
  transports: [
    new winston.transports.Console({
      // If the log level is 'error', log to stderr (standard error stream) instead of stdout
      stderrLevels: ['error'],
    }),
  ],
});

// Export the logger so it can be used in other parts of the application
export default logger;
