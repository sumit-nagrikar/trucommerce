import app from './app.js';
import connectDB from './config/database.js';
import { config } from './config/config.js';
import logger from './config/logger.js'; // Import the logger

// Connect to MongoDB
connectDB();

// Start the server
let server = app.listen(config.port, () => {
  logger.info(`🚀 Server is running on port ${config.port}`);
});

// Graceful shutdown function
const exitHandler = (error) => {
  if (error) logger.error(`❌ Server error: ${error.message}`);

  if (server) {
    server.close(() => {
      logger.info('🛑 Server closed due to an error.');
      process.exit(1);
    });

    // Force exit if server.close() hangs
    setTimeout(() => {
      logger.warn('⚠️ Force exiting process...');
      process.exit(1);
    }, 5000);
  } else {
    process.exit(1);
  }
};

// Handle uncaught exceptions and promise rejections
process.on('uncaughtException', (error) => {
  logger.error(`💥 Uncaught Exception: ${error.message}`);
  exitHandler(error);
});

process.on('unhandledRejection', (reason) => {
  logger.error(`🚨 Unhandled Promise Rejection: ${reason}`);
  exitHandler(reason);
});

// Handle SIGTERM (used in containerized environments like Docker)
process.on('SIGTERM', () => {
  logger.info('📴 SIGTERM received. Shutting down gracefully...');
  if (server) {
    server.close(() => {
      logger.info('✅ Server closed due to SIGTERM.');
      process.exit(0);
    });
  }
});
