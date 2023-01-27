const winston = require('winston');
require('winston-daily-rotate-file');

const { combine, timestamp: wTimestamp, printf } = winston.format;

const myFormat = printf(
  ({ level, message, timestamp }) => `${timestamp} ${level}: ${message}`
);

// const logger = winston.createLogger({
//   level: 'info',
//   format: combine(wTimestamp(), myFormat),
//   transports: [
//     new winston.transports.Console(),
//     new winston.transports.DailyRotateFile({
//       filename: 'logs/info-%DATE%.log',
//       level: 'info',
//       datePattern: 'YYYY-MM-DD',
//       zippedArchive: true,
//       maxSize: '20m',
//       maxFiles: '14d',
//       utc: true,
//     }),
//     new winston.transports.DailyRotateFile({
//       filename: 'logs/error-%DATE%.log',
//       level: 'error',
//       datePattern: 'YYYY-MM-DD',
//       zippedArchive: true,
//       maxSize: '20m',
//       maxFiles: '14d',
//       utc: true,
//     }),
//   ],
// });

const logger = winston.createLogger({
  level: 'info',
  format: combine(wTimestamp(), myFormat),
  transports: [new winston.transports.Console()],
});

// if (process.env.NODE_ENV !== 'production') {
//   logger.add(
//     new winston.transports.Console({
//       format: winston.format.splat(),
//     })
//   );
// }

module.exports = logger;
