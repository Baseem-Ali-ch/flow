import { createLogger, format, transports } from "winston";

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.printf(({ timestamp, level, message, stack, error }) => {
      if (stack) {
        return `${timestamp} [${level}]: ${message} - ${stack}`;
      }
      if (error) {
        return `${timestamp} [${level}]: ${message} - ${error}`;
      }
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [new transports.Console()]      
});

export default logger;