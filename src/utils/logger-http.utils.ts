import expressWinston from "express-winston";
import winston from "winston";

const loggerHttp = expressWinston.logger({
    transports: [
      new winston.transports.Console()
    ],
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
    colorize: true,
  })

export default loggerHttp