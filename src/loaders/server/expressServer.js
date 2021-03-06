const express = require("express");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const config = require("../../config");
const userRoute = require("../../routes/users");
const authRoute = require("../../routes/auth");
const logger = require("../logger");

class ExpressServer {
  constructor() {
    this.app = express();
    this.port = config.port;
    this.basePathUser = `${config.api.prefix}/users`;
    this.basePathAuth = `${config.api.prefix}/auth`;

    this._middlewares();

    this._routes();
    this._swaggerConfig();

    this._notFound();
    this._errorHandler();
  }

  _middlewares() {
    this.app.use(express.json());
    this.app.use(morgan("tiny"));
  }

  _routes() {
    // testing cmd git flow
    this.app.head("/status", (req, res) => {
      res.status(200).end();
    });

    this.app.use(`${this.basePathUser}`, userRoute);
    this.app.use(`${this.basePathAuth}`, authRoute);
  }

  _notFound() {
    this.app.use((req, res, next) => {
      const error = new Error("Not Found");
      error.code = 404;
      next(error);
    });
  }

  _errorHandler() {
    this.app.use((err, req, res, next) => {
      const code = err.code || 500;

      const body = {
        error: {
          code,
          message: err.message,
          detail: err.data,
        },
      };

      res.status(code).json(body);
    });
  }

  _swaggerConfig() {
    this.app.use(
      config.swagger.path,
      swaggerUi.serve,
      swaggerUi.setup(require("../swagger/swagger.json"))
    );
  }

  async start() {
    this.app.listen(this.port, (error) => {
      if (error) {
        logger.error(error);
        process.exit(1);
      }
    });
  }
}

module.exports = ExpressServer;
