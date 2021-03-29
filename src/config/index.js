const dotenv = require("dotenv");

const envFound = dotenv.config();

if (!envFound) {
  throw new Error("couldn't find .env file.");
}

process.env.NODE_ENV = process.env.NODE_ENV || "develompent";

module.exports = {
  port: process.env.PORT,
  api: {
    prefix: "/api/v1",
  },
  log: {
    level: process.env.LOG_LEVEL,
  },
  swagger: {
    path: "/documentation",
  },
};
