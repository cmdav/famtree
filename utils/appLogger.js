const winston = require('winston');
const fs = require('fs');
const path = require('path');

const logDir = path.join(process.cwd(), 'serverlogs');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  defaultMeta: { service: 'FamTree Backend services' },
  transports: [
    new winston.transports.File({
      filename: getLogFilePath(),
      level: 'error'
    }),
    new winston.transports.File({
      filename: getLogFilePath(),
      level: 'info'
    }),
    new winston.transports.Console()
  ]
});

function getLogFilePath() {
  const now = new Date();
  const day = now.getDate().toString().padStart(2, '0');
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const year = now.getFullYear().toString();
  const logFilePath = path.join(logDir, `log_${day}${month}${year}.log`);
  return logFilePath;
}

// Create a function to roll the log file
const rollLog = () => {
  const newLogFile = getLogFilePath();
  fs.copyFileSync(getLogFilePath(), newLogFile);
  fs.truncateSync(getLogFilePath());
};

// Set up a timer to roll the log file every day
setInterval(rollLog, 24 * 60 * 60 * 1000);

module.exports = logger;