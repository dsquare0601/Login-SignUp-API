const winston = require("winston");
var today = new Date();
var date =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
// console.log(mydate);
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new winston.transports.File({
      filename: `./Logs/${date}-error.log`,
      level: "error",
    }),
    new winston.transports.File({
      filename: `./Logs/${date}-info.log`,
    }),
  ],
});

module.exports = logger;
