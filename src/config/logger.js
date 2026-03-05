import winston from "winston";

const levels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  http: 4,
  debug: 5
};

const colors = {
  fatal: "red",
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white"
};

winston.addColors(colors);

const devLogger = winston.createLogger({
  levels,
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
  transports: [new winston.transports.Console()]
});

const prodLogger = winston.createLogger({
  levels,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({
      filename: "./errors.log",
      level: "error"
    }),
    new winston.transports.File({
      filename: "./combined.log"
    })
  ]
});

export const logger =
  process.env.NODE_ENV === "production" ? prodLogger : devLogger;